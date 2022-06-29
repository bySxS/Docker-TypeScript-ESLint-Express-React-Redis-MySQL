import { buildDevLogger } from './dev-logger'
import { buildProdLogger } from './prod-logger'
import { Logger } from 'winston'

let logger: Logger
const environment: string = process.env.NODE_ENV || 'development'
if (environment === 'development') {
  logger = buildDevLogger()
} else {
  logger = buildProdLogger()
}

export interface IError {
    message: string
}

export default logger

// logger.info('text info', { meta: 1 });
// logger.warn('text warn');
// logger.error('text error');
// logger.error(new Error('something went wrong'));
