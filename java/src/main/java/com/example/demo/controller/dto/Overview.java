package com.example.demo.controller.dto;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class Overview {
    Boolean loaded;
    Integer firstYear;
}
