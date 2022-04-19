package com.example.demo.controller.dto;

import lombok.Value;

import java.math.BigDecimal;

@Value
public class Month {
    int monthOfYear;
    BigDecimal dividends;
}
