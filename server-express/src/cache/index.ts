import { createClient } from 'redis'
import { promisifyAll } from 'bluebird'
import logger, { IError } from '../logger'
import dotenv from 'dotenv'
dotenv.config()

const REDIS_URL: string = process.env.REDIS_CACHE_URL || 'redis://localhost:6379'
const client = createClient({
  url: REDIS_URL,
  database: 1
})// db1 redis
client.connect()
  .then(() => {
    logger.info('Redis connected')
  })
  .catch(e => {
    const err = e as IError
    logger.error('Redis error ' + err.message, { db: 'Redis' })
  })

export const cacheRedisDB = promisifyAll(client)
