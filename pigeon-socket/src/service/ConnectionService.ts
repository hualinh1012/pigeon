import {injectable} from "inversify";
import {Socket} from "socket.io";
import {AuthenticatedConnection} from "../entity/AuthenticatedConnection";

export interface IConnectionService {
    addUnauthenticatedConnection(socket: Socket): void;

    removeUnauthenticatedConnection(socketId: string): void;

    getUnauthenticatedConnection(socketId: string): Socket | undefined;

    addAuthenticatedConnection(connection: AuthenticatedConnection): void;

    removeAuthenticatedConnection(socketId: string): AuthenticatedConnection | undefined;

    getAuthenticatedConnection(socketId: string): AuthenticatedConnection | undefined;

    getUserConnections(userId: string): AuthenticatedConnection[] | undefined;
}

@injectable()
export class ConnectionService implements IConnectionService {

    private unauthenticatedConnectionMap = new Map<string, Socket>();

    private authenticatedConnectionMap = new Map<string, AuthenticatedConnection>();
    private userConnectionMap = new Map<string, AuthenticatedConnection[]>();

    constructor() {

    }

    addUnauthenticatedConnection(socket: Socket): void {
        this.unauthenticatedConnectionMap.set(socket.id, socket);
    }

    removeUnauthenticatedConnection(socketId: string): void {
        this.unauthenticatedConnectionMap.delete(socketId);
    }

    getUnauthenticatedConnection(socketId: string): Socket | undefined {
        return this.unauthenticatedConnectionMap.get(socketId);
    }

    addAuthenticatedConnection(connection: AuthenticatedConnection): void {
        let userSockets = this.userConnectionMap.get(connection.userId);
        if (userSockets === undefined) {
            userSockets = [connection];
        } else {
            userSockets.push(connection);
        }
        this.userConnectionMap.set(connection.userId, userSockets);
        this.authenticatedConnectionMap.set(connection.socket.id, connection);
    }

    removeAuthenticatedConnection(socketId: string): AuthenticatedConnection | undefined {
        let connection = this.authenticatedConnectionMap.get(socketId);
        if (connection === undefined) {
            return undefined;
        }
        this.authenticatedConnectionMap.delete(socketId);

        let userSockets = this.userConnectionMap.get(connection.userId);
        if (userSockets !== undefined) {
            const index = userSockets.indexOf(connection, 0);
            if (index > -1) {
                userSockets.splice(index, 1);
            }
        }

        return connection;
    }

    getAuthenticatedConnection(socketId: string): AuthenticatedConnection | undefined {
        return this.authenticatedConnectionMap.get(socketId);
    }

    getUserConnections(userId: string): AuthenticatedConnection[] | undefined {
        return this.userConnectionMap.get(userId);
    }

}