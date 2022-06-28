import dotenv from 'dotenv'
dotenv.config()


interface IKnexConfig {
    [key: string]: object;
}

const defaultConf = {
  client: 'mysql',
  connection: { // migrations
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: 'site-ts-test',
    charset: 'utf8'
  }
}

const knexConfig: IKnexConfig = {
  test: {
    ...defaultConf,
    connection: { // migrations
      database: 'site-ts-test'
    }
  },
  development: {
    ...defaultConf,
    connection: { // migrations
      database: 'site-ts-test'
    }
  },
  production: {
    ...defaultConf,
    connection: { // migrations
      database: 'site-ts-test'
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
  }

}

export default knexConfig

module.exports = { // для migrate: make только с этим работает
  test: {
    client: 'mysql',
    connection: { // migrations
      host: '127.0.0.1',
      user: 'sxs',
      password: '123456789s',
      database: 'site-ts-test',
      charset: 'utf8'
    }
  },
  development: {
    client: 'mysql',
    connection: { // migrations
      host: '127.0.0.1',
      user: 'sxs',
      password: '123456789s',
      database: 'site-ts-test',
      charset: 'utf8'
    }
  },
  production: {
    client: 'mysql',
    connection: { // migrations
      host: '127.0.0.1',
      user: 'sxs',
      password: '123456789s',
      database: 'site-ts-test',
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
  }

}
