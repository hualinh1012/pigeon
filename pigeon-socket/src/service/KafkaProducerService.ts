import {inject, injectable} from "inversify";
import {IConfig} from "../IoC/Config";
import {IKafkaConnectionService} from "./KafkaConnectionService";
import {Producer} from "kafkajs";

export interface IKafkaProducerService {
    publish(message: String): Promise<void>;
}

@injectable()
export class KafkaProducerService implements IKafkaProducerService {

    private producer: Producer;

    constructor(
        @inject("Config") private config: IConfig,
        @inject("KafkaConnectionService") private kafkaService: IKafkaConnectionService,
    ) {
        this.producer = kafkaService.getKafkaConnection().producer();
        this.producer.connect().catch(console.error);
    }

    async publish(message: string): Promise<void> {
        await this.producer.send({
            topic: this.config.kafkaProducerTopic,
            messages: [
                {value: message},
            ]
        });
    }
}