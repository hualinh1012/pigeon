import {config} from "dotenv";

config();


export interface IConfig {
    port: number;
    kafkaBrokers: string[];
    kafkaClientId: string;
    kafkaProducerTopic: string;
    kafkaConsumerTopic: string;
    kafkaConsumerGroup: string;
}

export function getConfig(): IConfig {
    return {
        port: parseInt(process.env.PORT as string),
        kafkaBrokers: (process.env.KAFKA_BROKERS as string).split(","),
        kafkaClientId: (process.env.KAFKA_CLIENT_ID as string),
        kafkaProducerTopic: (process.env.KAFKA_PRODUCER_TOPIC as string),
        kafkaConsumerTopic: (process.env.KAFKA_CONSUMER_TOPIC as string),
        kafkaConsumerGroup: (process.env.KAFKA_CONSUMER_GROUP as string)
    };
}