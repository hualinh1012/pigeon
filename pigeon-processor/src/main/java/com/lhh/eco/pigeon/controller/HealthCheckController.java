package com.lhh.eco.pigeon.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
public class HealthCheckController {
    @GetMapping("/hc")
    public Mono<String> healthcheck() {
        return Mono.just("OK!");
    }
}
