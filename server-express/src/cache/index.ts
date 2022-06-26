import { createClient } from 'redis'
import { promisifyAll } from 'bluebird'
import logger, { IError } from '../logger'

const client = createClient({ database: 1 })// db1 redis
client.connect()
  .then(() => {
    logger.info('Redis connected')
  })
  .catch(e => {
    const err = e as IError
    logger.error('Redis error ' + err.message, { db: 'Redis' })
  })

export const cacheRedisDB = promisifyAll(client)