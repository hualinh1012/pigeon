package com.lhh.eco.pigeon.configuration;

import org.apache.kafka.clients.admin.*;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import reactor.kafka.receiver.KafkaReceiver;
import reactor.kafka.receiver.ReceiverOptions;
import reactor.kafka.receiver.internals.ConsumerFactory;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Configuration
public class KafkaConsumerConfiguration {

    @Autowired
    private Logger logger;

    @Value("${kafka.reactive.consumer.bootstrap-servers}")
    private String bootstrapServers;
    @Value("${kafka.reactive.consumer.client-id}")
    private String clientId;
    @Value("${kafka.reactive.consumer.group-id}")
    private String groupId;
    @Value("${kafka.reactive.consumer.topic}")
    private String topic;
    @Value("${kafka.reactive.consumer.partitions}")
    private int partitions;
    @Value("${kafka.reactive.consumer.replications}")
    private short replications;

    @Bean
    Map<String, Object> kafkaConsumerConfiguration() {
        Map<String, Object> props = new HashMap<>();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        props.put(ConsumerConfig.CLIENT_ID_CONFIG, clientId);
        props.put(ConsumerConfig.GROUP_ID_CONFIG, groupId);
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        props.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, true);
        return props;
    }

    @Bean
    void ensureTopicIsCreated() throws ExecutionException, InterruptedException {
        try (Admin admin = Admin.create(kafkaConsumerConfiguration())) {
            DescribeTopicsResult describeTopicsResult = admin.describeTopics(Collections.singleton(topic));
            TopicDescription topicDescription = describeTopicsResult.topicNameValues().get(topic).get();
            if (topicDescription == null) {
                NewTopic newTopic = new NewTopic(topic, partitions, replications);
                CreateTopicsResult createTopicsResult = admin.createTopics(Collections.singleton(newTopic));
                if (createTopicsResult.topicId(topic).get() != null) {
                    logger.info("Creating new topic successfully! - {} ", topic);
                }
            } else {
                logger.info("Topic is already exist, no action required! - {}", topic);
            }
        }
    }

    @Bean
    KafkaReceiver<String, String> configKafkaReceiver() {
        ReceiverOptions<String, String> receiverOptions = ReceiverOptions.create(kafkaConsumerConfiguration());
        receiverOptions = receiverOptions.subscription(Collections.singleton(topic));
        return KafkaReceiver.create(ConsumerFactory.INSTANCE, receiverOptions);
    }
}
