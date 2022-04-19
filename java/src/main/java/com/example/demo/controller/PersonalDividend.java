package com.example.demo.controller;

import lombok.Builder;
import lombok.Data;
import lombok.Value;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class PersonalDividend {
    String instrumentName;
    String isin;
    String currency;
    LocalDate date;
    BigDecimal shares;
    BigDecimal amount;
    BigDecimal totalAmount;
}
