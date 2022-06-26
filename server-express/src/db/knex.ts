interface IKnexConfig {
    [key: string]: object;
}

const knexConfig: IKnexConfig = {
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
