import {Container} from "inversify";

import {getConfig} from "./Config";
import {MainService} from "../service/MainService";
import {WebSocketService} from "../service/WebSocketService";
import {SocketConnectionService} from "../service/SocketConnectionService";
import {KafkaConnectionService} from "../service/KafkaConnectionService";
import {KafkaConsumerService} from "../service/KafkaConsumerService";
import {KafkaProducerService} from "../service/KafkaProducerService";

export const createContainer = () => {
    const container = new Container();

    container.bind("Config").toConstantValue(getConfig());

    container.bind("MainService").to(MainService)
    container.bind("WebsocketService").to(WebSocketService)
    container.bind("SocketConnectionService").to(SocketConnectionService)
    container.bind("KafkaConnectionService").to(KafkaConnectionService)
    container.bind("KafkaConsumerService").to(KafkaConsumerService)
    container.bind("KafkaProducerService").to(KafkaProducerService)

    return container;
}

export const container = createContainer();