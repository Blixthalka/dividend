package com.example.demo.controller.dto;

import lombok.Value;

import java.math.BigDecimal;
import java.time.LocalDate;

@Value
public class AccumElement {
    LocalDate date;
    BigDecimal sumToDate;
}
