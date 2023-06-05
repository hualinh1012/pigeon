import {Container} from "inversify";

import {getConfig} from "./config";
import {MainService} from "../service/MainService";
import {WebSocketService} from "../service/WebSocketService";

export const createContainer = () => {
    const container = new Container();

    container.bind("config").toConstantValue(getConfig());

    container.bind("MainService").to(MainService)
    container.bind("WebsocketService").to(WebSocketService)

    return container;
}

export const container = createContainer();