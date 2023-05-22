package com.lhh.eco.pigeon.controller;

import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController("/test")
public class TestController {

    public Mono<String> testRepository() {
        return Mono.just("OK");
    }
}
