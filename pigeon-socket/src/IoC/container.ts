import {Container} from "inversify";

import {getConfig} from "./config";
import {MainService} from "../service/MainService";

export const createContainer = () => {
    const container = new Container();

    container.bind("config").toConstantValue(getConfig());

    container.bind("MainService").to(MainService)

    return container;
}

export const container = createContainer();