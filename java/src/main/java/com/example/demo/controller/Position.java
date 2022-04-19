package com.example.demo.controller;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class Position {
    Instrument instrument;
    BigDecimal quantity;
}
