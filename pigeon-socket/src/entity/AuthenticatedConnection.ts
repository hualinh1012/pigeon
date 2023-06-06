import {Socket} from "socket.io";

export interface AuthenticatedConnection {
    userId: string;
    userName: string;
    socket: Socket
}