import {Server, Socket} from "socket.io";
import * as http from "http";
import {Container, inject, injectable} from "inversify";
import {ISocketConnectionService} from "./SocketConnectionService";
import {AuthenticatedConnection} from "../entity/AuthenticatedConnection";
import {IKafkaProducerService} from "./KafkaProducerService";

export interface IWebSocketService {
    io: Server;

    init(httpServer: http.Server, container: Container): void;

    send(message: string | undefined): void;
}

@injectable()
export class WebSocketService implements IWebSocketService {

    public io: Server;

    constructor(
        @inject("SocketConnectionService") private connectionService: ISocketConnectionService,
        @inject("KafkaProducerService") private kafkaProducerService: IKafkaProducerService) {
    }

    init(httpServer: http.Server, container: Container): void {
        this.io = new Server(httpServer);

        this.io.on("connection", (socket) => {
            console.log("New socket connection connected to server, id=%s", socket.id)
            this.connectionService.addUnauthenticatedConnection(socket);

            socket.on("disconnect", () => {
                console.log("Socket is disconnected, id=%s", socket.id)
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
                    this.kafkaProducerService.publish(message).catch(console.error);
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

    send(message: string): void {
        this.connectionService.getAllAuthenticatedConnection().forEach((connection) => {
            connection.socket.send("message", message);
        })
    }

}