import * as _ from 'lodash';
import {config} from "dotenv";

config();

export function getEnvConfig<C extends IConfig>(
    stringConfigVars: string[],
    numberConfigVars: string[],
    booleanConfigVars: string[]
): C {
    const config: any = {};
    // convert string config variables from env file to config object
    stringConfigVars.forEach((configKey) => {
        const strVal = process.env[configKey];
        if (strVal === undefined) {
            throw new Error(`Environment variable '${configKey}' missing`);
        }

        const camelCaseKey = _.camelCase(configKey);
        config[camelCaseKey] = strVal;
    });

    // convert number config variables from env file to config object
    numberConfigVars.forEach((configKey) => {
        const strVal = process.env[configKey];
        if (strVal === undefined) {
            throw new Error(`Environment variable '${configKey}' missing`);
        }

        const numVal = parseInt(strVal, 10);
        if (Number.isNaN(numVal)) {
            throw new Error(
                `Environment variable '${configKey}' not a valid integer`,
            );
        }

        const camelCaseKey = _.camelCase(configKey);
        config[camelCaseKey] = numVal;
    });

    // convert boolean config variables from env file to config object
    booleanConfigVars.forEach((configKey) => {
        const strVal = process.env[configKey];
        if (strVal === undefined) {
            throw new Error(`Environment variable '${configKey}' missing`);
        }

        const camelCaseKey = _.camelCase(configKey);
        if (strVal === "true") {
            config[camelCaseKey] = true;
            return;
        }
        if (strVal === "false") {
            config[camelCaseKey] = false;
            return;
        }

        throw new Error(`Environment variable '${configKey}' not true/false`);
    });

    return config as C;
}

export function getConfig(): IConfig {
    console.log(process.env)
    return {
        port: 3030
    };
}

export interface IConfig {
    port: number;

}