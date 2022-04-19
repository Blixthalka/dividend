package com.example.demo.controller.dto;

import com.example.demo.controller.PersonalDividend;
import lombok.Builder;
import lombok.Value;

import java.math.BigDecimal;
import java.util.List;

@Value
@Builder
public class DividendInstrument {
    String name;
    String isin;
    String currency;
    BigDecimal totalDividends;
    List<PersonalDividend> dividends;
}
