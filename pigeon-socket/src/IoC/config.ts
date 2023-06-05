import {config} from "dotenv";

config();


export interface IConfig {
    port: number;
}

export function getConfig(): IConfig {
    return {
        port: parseInt(process.env.PORT as string)
    };
}