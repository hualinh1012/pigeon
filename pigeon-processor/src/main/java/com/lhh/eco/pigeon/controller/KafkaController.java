package com.lhh.eco.pigeon.controller;

import com.lhh.eco.pigeon.service.IMessageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class KafkaController {

    private IMessageService messageService;
    @Autowired
    public KafkaController(IMessageService messageService) {
        this.messageService = messageService;
    }

    @KafkaListener(
            topics = "${spring.kafka.consumer.topic}",
            groupId = "${spring.kafka.consumer.group-id}",
            concurrency = "${spring.kafka.consumer.concurrency}")
    public void messageListener(String message) {
        System.out.println("Receive message: " + message);
        messageService.sendMessage(message + " [ROUTED BACK]");
    }

}
