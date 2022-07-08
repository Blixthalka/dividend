package com.example.demo.data;

import com.example.demo.controller.PersonalDividend;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.*;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Component
public class AvanzaReader {


    public List<PersonalDividend> read(InputStream inputStream) throws IOException {
        //File file = new File("/Users/emil/Downloads/transaktioner_2017-01-01_2022-07-01.csv");
        //File file = new File("/Users/emil/Downloads/transaktioner_2004-01-30_2022-03-01.csv");
        //File file = new File("/Users/emil/Downloads/transaktioner_2017-01-01_2022-03-03.csv");
        return readCsvFile(inputStream).stream()
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

    private List<Map<String, String>> readCsvFile(InputStream inputStream) throws IOException {
        List<String> lines = readLines(inputStream);
        List<String> header = split(lines.get(0)).stream()
                .map(h -> h.trim().replace("\uFEFF", ""))
                .collect(Collectors.toList());
        if (!header.get(0).equals("Datum")) {
            throw new IOException("Does not start with correct header got='" + header.get(0) +"' wanted 'Datum'");
        }
        lines.remove(0);
        return lines.stream()
                .map(line -> {
                    List<String> columns = split(line);
                    HashMap<String, String> headerToColumnValue = new HashMap<>();
                    for (int i = 0; i < header.size(); i++) {
                        headerToColumnValue.put(header.get(i), columns.get(i).trim());
                    }
                    return headerToColumnValue;
                })
                .collect(Collectors.toList());
    }

    private List<String> readLines(InputStream inputStream) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
        ArrayList<String> lines = new ArrayList<>();
        while (reader.ready()) {
            lines.add(new String(reader.readLine().getBytes(StandardCharsets.UTF_8)));
        }
        return lines;
    }

    private List<String> split(String s) {
        return List.of(s.split(";", -1));
    }


}
