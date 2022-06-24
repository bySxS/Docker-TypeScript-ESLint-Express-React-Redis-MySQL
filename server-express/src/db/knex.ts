import dotenv from 'dotenv'
dotenv.config()

const defaults = {
    client: 'mysql',
    connection: { //migrations
        host: '127.0.0.1',
        user: 'sxs',
        password: '123456789s',
        database: 'site-ts-test',
        charset: 'utf8'
    },
    migrations: {
        directory: '../db/migrations',
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

interface IKnexConfig {
    [key: string]: object;
};

export const knexConfig: IKnexConfig = {
    test: {
        ...defaults,
        connection: { //migrations
            database: 'site-test',
        },
    },
    development: {
        ...defaults,
        connection: { //migrations
            database: 'site-dev',
        },
    },
    production: {
        ...defaults,
        connection: { //migrations
            database: 'site-prod',
        }
    },

}