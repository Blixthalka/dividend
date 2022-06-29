package com.example.demo.data;

import com.example.demo.controller.PersonalDividend;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.File;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Component
public class AvanzaReader {


    public List<PersonalDividend> read() {
        //File file = new File("/Users/emil/Downloads/transaktioner_2017-01-01_2022-05-16.csv");
        File file = new File("/Users/emil/Downloads/transaktioner_2004-01-30_2022-03-01.csv");
        //File file = new File("/Users/emil/Downloads/transaktioner_2017-01-01_2022-03-03.csv");
        return readCsvFile(file).stream()
                .filter(line -> line.get("Typ av transaktion").equals("Utdelning"))
                .map(line -> {
                    log.info("{}", line);
                    return PersonalDividend.builder()
                            .date(LocalDate.parse(line.get("Datum")))
                            .totalAmount(parseBigDecimal(line, "Belopp"))
                            .amount(parseBigDecimal(line, "Kurs"))
                            .instrumentName(line.get("Värdepapper/beskrivning"))
                            .shares(parseBigDecimal(line, "Antal"))
                            .isin(line.get("ISIN"))
                            .currency(line.get("Valuta"))
                            .build();
                })
                .collect(Collectors.toList());
    }

    private BigDecimal parseBigDecimal(Map<String, String> line, String header) {
        return new BigDecimal(line.get(header).replace(",", "."));
    }

    @SneakyThrows
    private List<Map<String, String>> readCsvFile(File file) {
        List<String> lines = Files.readAllLines(file.getAbsoluteFile().toPath(), StandardCharsets.UTF_8);
        List<String> header = split(lines.get(0));
        lines.remove(0);
        return lines.stream()
                .map(line -> {
                    List<String> columns = split(line);
                    HashMap<String, String> headerToColumnValue = new HashMap<>();
                    for (int i = 0; i < header.size(); i++) {
                        headerToColumnValue.put(header.get(i).trim().replace("\uFEFF", ""), columns.get(i).trim());
                    }
                    return headerToColumnValue;
                })
                .collect(Collectors.toList());
    }

    private List<String> split(String s) {
        return List.of(s.split(";", -1));
    }


}
