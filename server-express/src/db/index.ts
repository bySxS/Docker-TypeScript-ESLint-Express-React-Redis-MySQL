import {  knex, Knex } from 'knex'
import { knexConfig } from './knex'
import { createClient } from 'redis'
import { promisifyAll } from 'bluebird'
import Queue from 'bull'
import dotenv from 'dotenv'
import Logger, {IError} from "../logger";
dotenv.config()
const environment: string = process.env.NODE_ENV || 'development'
const knexFile: Knex.Config = knexConfig[environment]

console.log(knexFile)
export const dbKnex = knex(knexFile)
const client = createClient({database: 1})//db1 redis
client.connect()
    .then(() => {
    Logger.info('Redis connected')
    })
    .catch(e => {
        const err = e as IError
        Logger.error('Redis error ' + err.message, {db: 'Redis'})
    })

export const cacheRedisDB = promisifyAll(client)
export const userQueueDB = new Queue('user-db-queue', 'redis://127.0.0.1:6379')//db0 redis

userQueueDB.process('update', async (job, done) => {
    //job.progress(0)
    try {
        const {id, nickname, fullName: full_name, email, password, roles_id} = job.data
        await dbKnex('users')
            .where('id', '=', id)
            .update({
                nickname,
                email,
                full_name,
                password,
                roles_id
            })
        done(null, {complete: true, message: `Пользователь ${job.data.nickname} успешно изменен`})
        //logger.info(`Пользователь ${job.data.nickname} успешно изменен`)
    } catch (e){
        const err = e as IError
        Logger.error(err.message, {db: 'userQueueDB'})
    }

    //job.progress(100)

});

userQueueDB.resume()

















