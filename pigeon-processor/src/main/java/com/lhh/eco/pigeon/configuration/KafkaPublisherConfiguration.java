package com.lhh.eco.pigeon.configuration;

import org.apache.kafka.clients.producer.ProducerConfig;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import reactor.kafka.sender.KafkaSender;
import reactor.kafka.sender.SenderOptions;
import reactor.kafka.sender.internals.ProducerFactory;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaPublisherConfiguration {

    @Autowired
    private Logger logger;

    @Value("${kafka.reactive.consumer.bootstrap-servers}")
    private String bootstrapServers;

    @Bean
    Map<String, Object> kafkaPublisherConfiguration() {
        Map<String, Object> props = new HashMap<>();
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        return props;
    }

    @Bean
    KafkaSender<String, String> configKafkaSender() {
        SenderOptions<String, String> receiverOptions = SenderOptions.create(kafkaPublisherConfiguration());
        return KafkaSender.create(ProducerFactory.INSTANCE, receiverOptions);
    }
}
