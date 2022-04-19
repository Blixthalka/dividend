package com.example.demo.controller;

import com.example.demo.controller.dto.Month;
import lombok.Builder;
import lombok.Value;

import java.math.BigDecimal;
import java.util.List;

@Value
@Builder
public class DashboardData {
    List<PersonalDividend> dividends;
    BigDecimal totalDividends;
    BigDecimal dividendsThisYear;
    BigDecimal monthlyDividends;
    List<Month> monthsCurrentYear;
    List<Month> monthsLastYear;
}
