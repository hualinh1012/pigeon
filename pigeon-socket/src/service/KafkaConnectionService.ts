import {Kafka} from "kafkajs";
import {inject, injectable} from "inversify";
import {IConfig} from "../IoC/Config";
import {randomUUID} from "crypto";

export interface IKafkaConnectionService {
    getKafkaConnection(): Kafka;
}

@injectable()
export class KafkaConnectionService implements IKafkaConnectionService {

    private kafka: Kafka;

    constructor(@inject("Config") private config: IConfig) {
        this.kafka = new Kafka({
            clientId: config.kafkaClientId + "-" + randomUUID(),
            brokers: config.kafkaBrokers
        });
    }

    getKafkaConnection(): Kafka {
        return this.kafka;
    }
}