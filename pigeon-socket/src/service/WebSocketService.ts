import {Server, Socket} from "socket.io";
import * as http from "http";
import {Container, inject, injectable} from "inversify";
import {IConnectionService} from "./ConnectionService";
import {AuthenticatedConnection} from "../entity/AuthenticatedConnection";

export interface IWebSocketService {
    io: Server;

    init(httpServer: http.Server, container: Container): void;
}

@injectable()
export class WebSocketService implements IWebSocketService {

    public io: Server;

    constructor(
        @inject("ConnectionService") private connectionService: IConnectionService) {
    }

    init(httpServer: http.Server, container: Container): void {
        this.io = new Server(httpServer);

        this.io.on("connection", (socket) => {
            console.log("New socket connection connected to server, id=%s", socket.id)
            this.connectionService.addUnauthenticatedConnection(socket);

            socket.on("disconnect", () => {
                console.log("Socket is connected, id=%s", socket.id)
                this.connectionService.removeUnauthenticatedConnection(socket.id);
                this.connectionService.removeAuthenticatedConnection(socket.id);
            });

            socket.on("auth", (message) => {
                if (this.isAuthenticatedSocket(socket)) {
                    console.log("Socket is already authenticated!");
                } else {
                    this.authenticateSocket(message, socket);
                }
            });

            socket.on("message", (message) => {
                if (this.isAuthenticatedSocket(socket)) {
                    console.log("New message is coming to server: %s", message);
                } else {
                    console.log("Socket need to be authenticated before send messages!");
                }
            });
        });

        console.log("Socket server is ready!")
    }

    isAuthenticatedSocket(socket: Socket): boolean {
        return this.connectionService.getAuthenticatedConnection(socket.id) !== undefined;
    }

    authenticateSocket(message: string, socket: Socket): void {
        let userAuth = JSON.parse(message);
        let authenticatedConnection: AuthenticatedConnection = {
            userId: userAuth.userId,
            userName: userAuth.userId,
            socket: socket
        }
        this.connectionService.addAuthenticatedConnection(authenticatedConnection);
        console.log("Socket authenticates successfully!, id=%s", socket.id)
    }

}