import "reflect-metadata";
import {inject, injectable} from "inversify";
import {createServer} from "http";
import {IConfig} from "../IoC/Config";
import {IWebSocketService} from "./WebSocketService";
import {container} from "../IoC/Container";

export interface IMainService {
    start(): Promise<void>;
}

@injectable()
export class MainService implements IMainService {

    public constructor(
        @inject("config") private config: IConfig,
        @inject("WebsocketService") private websocketService: IWebSocketService
    ) {
    }

    async start(): Promise<void> {
        console.log("Starting server...")
        const port = this.config.port;

        const httpServer = createServer();
        this.websocketService.init(httpServer, container);


        httpServer.listen(port);
        console.log("Server is listening on port", port);
    }

}
