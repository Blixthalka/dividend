package com.example.demo.controller.dto;

import com.example.demo.controller.dto.Month;
import lombok.Builder;
import lombok.Value;

import java.math.BigDecimal;
import java.util.List;

@Value
@Builder
public class MonthData {
    Integer year;
    BigDecimal total;
    List<Month> months;
}
