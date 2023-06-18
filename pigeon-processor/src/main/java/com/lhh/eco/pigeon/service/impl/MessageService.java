package com.lhh.eco.pigeon.service.impl;

import com.lhh.eco.pigeon.service.IMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class MessageService implements IMessageService {
    private KafkaTemplate<String, String> kafkaTemplate;
    @Value("${spring.kafka.producer.topic}")
    private String producerTopic;

    @Autowired
    public MessageService(KafkaTemplate template) {
        this.kafkaTemplate = template;
    }
    @Override
    public void addMessage() {

    }

    @Override
    public void sendMessage(String message) {
        //More logic
        kafkaTemplate.send(producerTopic, message);
    }
}
