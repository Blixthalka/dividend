package com.example.demo.controller.dto;

import lombok.Builder;
import lombok.Value;

import java.math.BigDecimal;

@Value
@Builder
public class Instrument {
    String name;
    String isin;
    BigDecimal totalDividends;
}
