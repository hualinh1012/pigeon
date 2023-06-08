import {inject, injectable} from "inversify";
import {IKafkaConnectionService} from "./KafkaConnectionService";
import {Admin, Consumer} from "kafkajs";
import {randomUUID} from "crypto";
import {IConfig} from "../IoC/Config";
import {IWebSocketService} from "./WebSocketService";

export interface IKafkaConsumerService {
    start(): Promise<void>;
}

@injectable()
export class KafkaConsumerService implements IKafkaConsumerService {

    private consumer: Consumer;
    private admin: Admin;

    constructor(
        @inject("Config") private config: IConfig,
        @inject("KafkaConnectionService") private kafkaService: IKafkaConnectionService,
        @inject("WebsocketService") private websocketService: IWebSocketService,
    ) {
        this.consumer = this.kafkaService.getKafkaConnection().consumer({
            groupId: config.kafkaConsumerGroup + "-" + randomUUID()
        });
        this.admin = this.kafkaService.getKafkaConnection().admin();
    }

    async start(): Promise<void> {
        await this.startConsumeMessage();
        console.log("Kafka consumer is starting to consume messages!")
    }

    private async startConsumeMessage(): Promise<void> {
        await this.consumer.connect();
        await this.consumer.subscribe({
            topic: this.config.kafkaConsumerTopic,
            fromBeginning: false
        });

        await this.consumer.run({
            eachMessage: async ({topic, partition, message}) => {
                this.websocketService.send(message.value?.toString());
            },
        })
    }
}