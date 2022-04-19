package com.example.demo.controller.dto;

import lombok.Value;

import java.math.BigDecimal;

@Value
public class Year {
    int year;
    BigDecimal dividends;
}
