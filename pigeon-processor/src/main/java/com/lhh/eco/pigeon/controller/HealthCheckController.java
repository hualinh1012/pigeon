package com.lhh.eco.pigeon.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {
    @GetMapping("/hc")
    public String hello() {
        return "OK";
    }
}
