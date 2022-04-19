package com.example.demo.controller;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class Dividend {
    Long id;
    Long instrumentId;
    LocalDate exDate;
    LocalDate valueDate;
    BigDecimal amount;
    String currency;
}
