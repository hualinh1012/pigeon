package com.lhh.eco.pigeon.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class KafkaController {

    @KafkaListener(
            topics = "${spring.kafka.consumer.group-id}",
            groupId = "${spring.kafka.consumer.topic}",
            concurrency = "${spring.kafka.consumer.concurrency}")
    public void messageListener(String message) {
        System.out.println("Receive message: " + message);
    }

}
