import "reflect-metadata";
import {injectable} from "inversify";
import {createServer} from "http";
import {Server} from "socket.io";

export interface IMainService {
    start(): Promise<void>;
}

@injectable()
export class MainService implements IMainService {


    public constructor() {
    }

    async start(): Promise<void> {
        console.log("starting....")

        const httpServer = createServer();
        const io = new Server(httpServer, {});

        io.on("connection", (socket) => {
            // ...
        });

        httpServer.listen(3000);
    }

}
