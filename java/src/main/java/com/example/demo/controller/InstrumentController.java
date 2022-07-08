package com.example.demo.controller;

import com.example.demo.controller.dto.*;
import com.example.demo.data.AvanzaReader;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
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
    private List<PersonalDividend> personalDividends = new ArrayList<>();


    @GetMapping("/overview")
    public Overview getOverview() {
        Optional<Integer> firstYear = personalDividends.stream()
                .map(PersonalDividend::getDate)
                .min(Comparator.naturalOrder())
                .map(LocalDate::getYear);

        return Overview.builder()
                .firstYear(firstYear.orElse(null))
                .loaded(firstYear.isPresent())
                .build();
    }

    @GetMapping("/instruments")
    public List<DividendInstrument> getInstrument(
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false, defaultValue = "desc") SortDirection sortDirection,
            @RequestParam(required = false, defaultValue = "total_dividends") InstrumentColumn sortColumn
    ) {
        List<PersonalDividend> personalDividends1 = personalDividends.stream()
                .filter(d -> {
                    if (year == null) {
                        return true;
                    }
                    return d.getDate().getYear() == year;
                }).collect(Collectors.toList());
        List<DividendInstrument> list = groupBy(personalDividends1, PersonalDividend::getIsin)
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
                .sorted(getSortFunInstrument(sortColumn))
                .collect(Collectors.toList());

        if (sortDirection == SortDirection.desc) {
            Collections.reverse(list);
        }
        return list;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        log.info("asdf {}", file.getOriginalFilename());
        try {
            //Thread.sleep(2000);
            personalDividends = reader.read(file.getInputStream());
        } catch (IOException e) {
            log.error("error ", e);
            return ResponseEntity.status(400)
                    .body("test");
        }
        return ResponseEntity.status(200)
                .body("test");
    }

    private Comparator<DividendInstrument> getSortFunInstrument(InstrumentColumn column) {
        switch (column) {
            case name:
                return Comparator.comparing(DividendInstrument::getName, String.CASE_INSENSITIVE_ORDER);
            case isin:
                return Comparator.comparing(DividendInstrument::getIsin, String.CASE_INSENSITIVE_ORDER);
            case total_dividends:
                return Comparator.comparing(DividendInstrument::getTotalDividends);
            default:
                throw new RuntimeException("Could not find sort fun " + column);
        }
    }

    private enum InstrumentColumn {
        name,
        isin,
        total_dividends
    }

    @GetMapping("/instruments/{isin}")
    public Object getInstrumentByIsin(@PathVariable String isin) {
        List<PersonalDividend> dividends = groupBy(personalDividends, PersonalDividend::getIsin)
                .filter(entry -> entry.getKey().equals(isin))
                .flatMap(entry -> entry.getValue().stream())
                .collect(Collectors.toList());

        PersonalDividend first = dividends.stream()
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        BigDecimal totalDividends = dividends.stream()
                .map(PersonalDividend::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return com.example.demo.controller.dto.Instrument.builder()
                .isin(first.getIsin())
                .name(first.getInstrumentName())
                .totalDividends(totalDividends)
                .build();
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
        for (AccumElement accum : groupedByDate) {
            BigDecimal v = sum.add(accum.getSumToDate());
            accums.add(new AccumElement(accum.getDate(), v.setScale(0, RoundingMode.HALF_UP)));
            sum = v;
        }

        accums.add(new AccumElement(LocalDate.now(), sum.setScale(0, RoundingMode.HALF_UP)));

        return accums;
    }


    @GetMapping("/dividends/year")
    public YearData yearData(@RequestParam(required = false) String isin) {
        ArrayList<Year> years = new ArrayList<>();

        List<PersonalDividend> base = personalDividends.stream()
                .filter(d -> {
                    if (isin == null) {
                        return true;
                    }
                    return d.getIsin().equals(isin);
                })
                .collect(Collectors.toList());
        int minYear = base.stream()
                .map(PersonalDividend::getDate)
                .mapToInt(LocalDate::getYear)
                .min()
                .orElseThrow();

        Map<Integer, List<PersonalDividend>> yearDividends = groupBy(base, d -> d.getDate().getYear())
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

        BigDecimal monthly = null;
        BigDecimal number = null;
        BigDecimal rolling = null;
        if (year != null) {
            number = personalDividends.stream()
                    .filter(dividend -> dividend.getDate().getYear() == year)
                    .map(t -> BigDecimal.ONE)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            monthly = thisYear.divide(BigDecimal.valueOf(12), 0, RoundingMode.HALF_UP);
        } else {
            rolling = personalDividends.stream()
                    .filter(dividend -> dividend.getDate().isAfter(LocalDate.now().minusYears(1)))
                    .map(PersonalDividend::getTotalAmount)
                    .reduce(BigDecimal.ZERO, BigDecimal::add)
                    .setScale(0, RoundingMode.HALF_UP);
        }
        return DashboardData.builder()
                .dividends(personalDividends)
                .dividendsThisYear(thisYear)
                .totalDividends(total)
                .monthlyDividends(monthly)
                .numberOfDividends(number)
                .rolling(rolling)
                .build();
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
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Integer year
    ) {
        List<PersonalDividend> list = personalDividends.stream()
                .peek(d -> {
                    d.setTotalAmount(d.totalAmount.setScale(0, RoundingMode.HALF_UP));
                    d.setAmount(d.amount.setScale(2, RoundingMode.HALF_UP));
                })
                .filter(d -> {
                    if (search == null) {
                        return true;
                    }
                    String trimmedSearch = search.trim().toLowerCase();
                    if (trimmedSearch.isEmpty()) {
                        return true;
                    }
                    return d.getInstrumentName().toLowerCase().contains(trimmedSearch) || d.getIsin().toLowerCase().equals(trimmedSearch);
                })
                .filter(d -> {
                    if (year == null) {
                        return true;
                    }
                    return d.getDate().getYear() == year;
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
