import {Container} from "inversify";

import {getConfig} from "./Config";
import {MainService} from "../service/MainService";
import {WebSocketService} from "../service/WebSocketService";
import {ConnectionService} from "../service/ConnectionService";

export const createContainer = () => {
    const container = new Container();

    container.bind("config").toConstantValue(getConfig());

    container.bind("MainService").to(MainService)
    container.bind("WebsocketService").to(WebSocketService)
    container.bind("ConnectionService").to(ConnectionService)

    return container;
}

export const container = createContainer();