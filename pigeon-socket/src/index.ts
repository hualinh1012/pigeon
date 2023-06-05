import {container} from "./IoC/container";
import {IMainService} from "./service/MainService";

const server = container.get<IMainService>("MainService");

server.start();