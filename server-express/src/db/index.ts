import { knex, Knex } from 'knex'
import knexConfig from './knex'
import dotenv from 'dotenv'
dotenv.config({
  debug: true,
  override: true
})

const environment: string = process.env.NODE_ENV || 'development'
const knexFile: Knex.Config = knexConfig[environment]

export const dbKnex = knex(knexFile)
