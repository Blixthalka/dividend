package com.example.demo.controller;

import com.example.demo.controller.dto.*;
import com.example.demo.data.AvanzaReader;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Slf4j
@RestController("/api")
public class InstrumentController {

    @Autowired
    AvanzaReader reader;

    private final Map<Long, Instrument> instruments = new HashMap<>();
    private final Map<Long, Dividend> dividends = new HashMap<>();
    private final Map<Long, Transaction> transactions = new HashMap<>();
    private List<PersonalDividend> personalDividends;

    @PostMapping("/instruments")
    public Instrument createInstrument(@RequestBody Instrument instrument) {
        var id = genId(instruments.keySet());
        instrument.setId(id);
        instruments.put(instrument.getId(), instrument);
        return instrument;
    }

    @GetMapping("/instruments")
    public List<DividendInstrument> getInstrument(@RequestParam(required = false) Integer year) {
        List<PersonalDividend> personalDividends1 = personalDividends.stream()
                .filter(d -> {
                    if(year == null) {
                        return true;
                    }
                    return d.getDate().getYear() == year;
                }).collect(Collectors.toList());
        return groupBy(personalDividends1, PersonalDividend::getIsin)
                .filter(entry -> !entry.getKey().equals("-"))
                .map(entry -> {
                    BigDecimal total = entry.getValue().stream()
                            .map(PersonalDividend::getTotalAmount)
                            .reduce(BigDecimal.ZERO, BigDecimal::add)
                            .setScale(0, RoundingMode.HALF_UP);

                    return DividendInstrument.builder()
                            .isin(entry.getKey())
                            .name(entry.getValue().get(0).getInstrumentName())
                            .currency(entry.getValue().get(0).getCurrency())
                            .dividends(entry.getValue())
                            .totalDividends(total)
                            .build();
                })
                .sorted((d1, d2) -> d1.getTotalDividends().compareTo(d2.getTotalDividends()) * -1)
                .collect(Collectors.toList());
    }

    @GetMapping("/instruments/{instrumentId}")
    public Instrument getInstrument(@PathVariable Long instrumentId) {
        return instruments.get(instrumentId);
    }


    @GetMapping("/instruments/{instrumentId}/dividends")
    public List<Dividend> getDividends(@PathVariable Long instrumentId) {
        return dividends.values().stream()
                .filter(d -> d.getInstrumentId().equals(instrumentId))
                .collect(Collectors.toList());
    }

    @GetMapping("/instruments/{instrumentId}/dividends/{dividendId}")
    public Dividend getDividend(@PathVariable Long instrumentId, @PathVariable Long dividendId) {
        return dividends.get(dividendId);
    }

    @PostMapping("/transactions")
    public Transaction createTransaction(@RequestBody Transaction transaction) {
        var id = genId(transactions.keySet());
        transaction.setId(id);
        transactions.put(transaction.getId(), transaction);
        return transaction;
    }

    @GetMapping("/load")
    public void createTransaction() {
        personalDividends = reader.read();
    }

    @GetMapping("/positions")
    public Collection<Position> getPositions() {
        return groupBy(transactions.values(), Transaction::getInstrumentId)
                .map(entry -> {
                    Long instrumentId = entry.getKey();
                    BigDecimal quantity = calculatePositionForDate(entry.getValue(), LocalDate.now());
                    return new Position(instruments.get(instrumentId), quantity);
                })
                .collect(Collectors.toList());
    }

    @GetMapping("/dividends/year/{year}")
    public MonthData monthData(@PathVariable Integer year) {
        ArrayList<Month> months = new ArrayList<>();

        for (int i = 1; i <= 12; i++) {
            months.add(new Month(i, getSumForMonth(i, year)));
        }

        BigDecimal total = months.stream()
                .map(Month::getDividends)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return MonthData.builder()
                .year(year)
                .months(months)
                .total(total)
                .build();
    }

    @GetMapping("/dividends/accum")
    public List<AccumElement> accum() {
        ArrayList<AccumElement> accums = new ArrayList<>();

        List<AccumElement> groupedByDate = groupBy(personalDividends, PersonalDividend::getDate)
                .map(entry -> {
                    BigDecimal local = entry.getValue().stream()
                            .map(PersonalDividend::getTotalAmount)
                            .reduce(BigDecimal.ZERO, BigDecimal::add);
                    return new AccumElement(entry.getKey(), local);
                })
                .sorted(Comparator.comparing(AccumElement::getDate))
                .collect(Collectors.toList());

        BigDecimal sum = BigDecimal.ZERO;
        for (AccumElement accum: groupedByDate) {
            BigDecimal v = sum.add(accum.getSumToDate());
            accums.add(new AccumElement(accum.getDate(), v.setScale(0, RoundingMode.HALF_UP)));
            sum = v;
        }

        accums.add(new AccumElement(LocalDate.now(), sum.setScale(0, RoundingMode.HALF_UP)));

        return accums;
    }


    @GetMapping("/dividends/year")
    public YearData yearData() {
        ArrayList<Year> years = new ArrayList<>();

        int minYear = personalDividends.stream()
                .map(PersonalDividend::getDate)
                .mapToInt(LocalDate::getYear)
                .min()
                .orElseThrow();

        Map<Integer, List<PersonalDividend>> yearDividends = groupBy(personalDividends, d -> d.getDate().getYear())
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

        for (int year = minYear; year <= LocalDate.now().getYear(); year++) {
            BigDecimal value = Optional.ofNullable(yearDividends.get(year))
                    .orElse(Collections.emptyList())
                    .stream()
                    .map(PersonalDividend::getTotalAmount)
                    .reduce(BigDecimal.ZERO, BigDecimal::add)
                    .setScale(0, RoundingMode.HALF_UP);
            years.add(new Year(year, value));
        }

        return new YearData(years);
    }

    @GetMapping(value = {"/dashboard", "/dashboard/{year}"})
    public DashboardData getDashboardData(@PathVariable(required = false) Integer year) {

        int currentYear;

        if (year == null) {
            currentYear = LocalDate.now().getYear();
        } else {
            currentYear = year;
        }

        BigDecimal thisYear = personalDividends.stream()
                .filter(dividend -> dividend.getDate().getYear() == currentYear)
                .map(PersonalDividend::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add)
                .setScale(0, RoundingMode.HALF_UP);

        BigDecimal total = personalDividends.stream()
                .map(PersonalDividend::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add)
                .setScale(0, RoundingMode.HALF_UP);

        BigDecimal monthly = thisYear
                .divide(getMonths(currentYear), 0, RoundingMode.HALF_UP);

        BigDecimal number = personalDividends.stream()
                .filter(dividend -> dividend.getDate().getYear() == currentYear)
                .map(t -> BigDecimal.ONE)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return DashboardData.builder()
                .dividends(personalDividends)
                .dividendsThisYear(thisYear)
                .totalDividends(total)
                .monthlyDividends(monthly)
                .numberOfDividends(number)
                .build();
    }

    public BigDecimal getMonths(int year) {
        if (year == LocalDate.now().getYear()) {
            return BigDecimal.valueOf(LocalDate.now().getMonth().getValue());
        } else {
            return new BigDecimal("12");
        }
    }


    private BigDecimal getSumForMonth(int i, int year) {
        return personalDividends.stream()
                .filter(dividend -> dividend.getDate().getYear() == year)
                .filter(dividend -> dividend.getDate().getMonthValue() == i)
                .map(PersonalDividend::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add)
                .setScale(0, RoundingMode.HALF_UP);
    }

    public BigDecimal calculatePositionForDate(Collection<Transaction> transactions, LocalDate date) {
        return transactions.stream()
                .filter(t -> t.getDate().compareTo(date) <= 0)
                .map(t -> t.getType() == Transaction.Type.BUY ? t.getQuantity() : t.getQuantity().negate())
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public static <T, K> Stream<Map.Entry<K, List<T>>> groupBy(Collection<T> collection, Function<T, K> grouping
    ) {
        return collection.stream()
                .collect(Collectors.groupingBy(grouping))
                .entrySet()
                .stream();
    }


    @GetMapping("/transactions")
    public List<PersonalDividend> getTransactions(
            @RequestParam(required = false, defaultValue = "asc") SortDirection sortDirection,
            @RequestParam(required = false, defaultValue = "date") DividendColumn sortColumn,
            @RequestParam(required = false) String search
    ) {
        List<PersonalDividend> list = personalDividends.stream()
                .peek(d -> {
                    d.setTotalAmount(d.totalAmount.setScale(0, RoundingMode.HALF_UP));
                    d.setAmount(d.amount.setScale(2, RoundingMode.HALF_UP));
                })
                .filter(d -> {
                    if (search == null ) {
                        return true;
                    }
                    String trimmedSearch = search.trim().toLowerCase();
                    if (trimmedSearch.isEmpty()) {
                        return true;
                    }
                    return d.getInstrumentName().toLowerCase().contains(trimmedSearch) || d.getIsin().toLowerCase().equals(trimmedSearch);
                })
                .sorted(getSortFun(sortColumn))
                .collect(Collectors.toList());
        if (sortDirection == SortDirection.desc) {
            Collections.reverse(list);
        }
        return list;
    }

    private Comparator<PersonalDividend> getSortFun(DividendColumn column) {
        switch (column) {
            case instrument:
                return Comparator.comparing(PersonalDividend::getInstrumentName, String.CASE_INSENSITIVE_ORDER);
            case isin:
                return Comparator.comparing(PersonalDividend::getIsin, String.CASE_INSENSITIVE_ORDER);
            case date:
                return Comparator.comparing(PersonalDividend::getDate);
            case amount:
                return Comparator.comparing(PersonalDividend::getTotalAmount);
            default:
                throw new RuntimeException("Could not find sort fun " + column);
        }
    }

    private enum DividendColumn {
        instrument,
        isin,
        date,
        amount
    }
    private enum SortDirection {
        asc,
        desc
    }


    private Long genId(Collection<Long> ids) {
        return ids.stream()
                .max(Long::compareTo)
                .orElse(0L) + 1;
    }


}
