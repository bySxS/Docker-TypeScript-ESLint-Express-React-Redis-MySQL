import { createClient } from 'redis'
import { promisifyAll } from 'bluebird'
import logger, { IError } from '../logger'

const REDIS_HOST: string = process.env.REDIS_CACHE_HOST || 'localhost'
const REDIS_PORT: number = Number(process.env.REDIS_CACHE_PORT) || 6379
const REDIS_URL = 'redis://' + REDIS_HOST + ':' + REDIS_PORT
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
