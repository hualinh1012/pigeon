import {container} from "./IoC/Container";
import {IMainService} from "./service/MainService";

const server = container.get<IMainService>("MainService");

server.start().catch(console.error);