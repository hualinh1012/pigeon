import {Server} from "socket.io";
import * as http from "http";
import {Container, injectable} from "inversify";

export interface IWebSocketService {
    io: Server;

    init(httpServer: http.Server, container: Container): void;
}

@injectable()
export class WebSocketService implements IWebSocketService {

    public io: Server;

    constructor() {
    }

    init(httpServer: http.Server, container: Container): void {
        this.io = new Server(httpServer);

        this.io.on("connection", (socket) => {
            console.log("new connection");
        });

        console.log("Socket server is ready!")
    }

}