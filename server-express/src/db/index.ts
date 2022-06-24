import {  knex, Knex } from 'knex'
import { knexConfig } from './knex'
import { createClient } from 'redis'
import { promisifyAll } from 'bluebird'
import Queue from 'bull'
import dotenv from 'dotenv'
dotenv.config()
const environment: string = process.env.NODE_ENV || 'development'
const knexFile: Knex.Config = knexConfig[environment]

export const dbKnex = knex(knexFile)
const client = createClient({database: 1})//db1 redis
client.connect()
    .then((e) => {
    console.log('Redis connected', e)
    })
    .catch(e => console.log('Redis error', e))

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
    } catch (err){
        console.log(err)
    }

    //job.progress(100)

});

userQueueDB.resume()

















