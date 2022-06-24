import { buildDevLogger } from "./dev-logger";
import { buildProdLogger } from "./prod-logger";
import { Logger } from "winston";
import dotenv from 'dotenv'
dotenv.config()

let Logger: Logger
const environment: string = process.env.NODE_ENV || 'development'
if (environment === 'development') {
    Logger = buildDevLogger();
} else {
    Logger = buildProdLogger();
}

export interface IError {
    message: string
}

export default Logger;

// logger.info('text info', { meta: 1 });
// logger.warn('text warn');
// logger.error('text error');
// logger.error(new Error('something went wrong'));