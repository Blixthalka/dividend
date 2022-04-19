package com.example.demo.controller;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class Transaction {
    Long id;
    Long instrumentId;
    BigDecimal quantity;
    Type type;
    LocalDate date;
    Instrument instrument;

    public static enum Type {
        BUY,
        SELL
    }

}
