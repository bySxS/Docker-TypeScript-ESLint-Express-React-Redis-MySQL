import logger from '../logger'

interface IKnexConfig {
    [key: string]: object;
}

const host: string = process.env.MYSQL_HOST || 'mysql'
const port: string = process.env.MYSQL_PORT || '3306'
const user: string = process.env.MYSQL_USER || 'sxs'
const password: string = process.env.MYSQL_PASS || '123456789s'
const database: string = process.env.MYSQL_DB_NAME || 'site-ts-test'

const defaultConf = {
  client: 'mysql',
  connection: { // migrations
    host,
    port,
    user,
    password,
    database,
    charset: 'utf8'
  }
}

const knexConfig: IKnexConfig = {
  test: {
    ...defaultConf,
    connection: { // migrations
      database
    }
  },
  development: {
    ...defaultConf,
    connection: { // migrations
      database
    }
  },
  production: {
    ...defaultConf,
    connection: {
      database
    }
  },
  migrations: {
    // directory: '../db/migrations',
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: '../db/seeds'
  },
  pool: {
    min: 2,
    max: 5
  },
  log: {
    error (message: string) {
      logger.error('knex mysql error: ' + message, { knex: 'error' })
    },
    debug (message: string) {
      logger.info('knex mysql debug: ' + message, { knex: 'debug' })
    }
  }

}

export default knexConfig

module.exports = { // для migrate: make только с этим работает
  test: {
    client: 'mysql',
    connection: { // migrations
      host,
      port,
      user,
      password,
      database,
      charset: 'utf8'
    }
  },
  development: {
    client: 'mysql',
    connection: { // migrations
      host,
      port,
      user,
      password,
      database,
      charset: 'utf8'
    }
  },
  production: {
    client: 'mysql',
    connection: { // migrations
      host,
      port,
      user,
      password,
      database,
      charset: 'utf8'
    }
  },
  migrations: {
    // directory: '../db/migrations',
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: '../db/seeds'
  },
  pool: {
    min: 2,
    max: 5
  },
  log: {
    error (message: string) {
      logger.error('knex mysql error: ' + message, { knex: 'error' })
    },
    debug (message: string) {
      logger.info('knex mysql debug: ' + message, { knex: 'debug' })
    }
  }

}
