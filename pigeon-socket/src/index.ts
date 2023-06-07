import {container} from "./IoC/Container";
import {IMainService} from "./service/MainService";
import {IKafkaConsumerService} from "./service/KafkaConsumerService";

const server = container.get<IMainService>("MainService");
server.start().catch(console.error);

const consumer = container.get<IKafkaConsumerService>("KafkaConsumerService");
consumer.start().catch(console.error);