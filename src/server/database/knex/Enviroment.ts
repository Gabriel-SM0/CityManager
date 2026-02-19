import { Knex } from 'knex';
import path from 'path';


const dbPath = path.resolve(__dirname, '..', '..', '..', '..', 'database.sqlite');

console.log(`DB path is: ${dbPath}`)
//dist\server\database\knex\Enviroment.js
//src\database.sqlite

export const development: Knex.Config = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: dbPath
        
    },
    migrations: {
        directory: path.resolve(__dirname, '..', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, '..', 'seeds')

    },
    pool: {
        afterCreate: (connection: any, done: Function) => {
            connection.run('PRAGMA foreign_keys = ON', done);
        }
    }
};

export const test = {
    ...development,
    connection: ':memory:',
};

export const production = {
    client: 'pg',
    migrations: {
        directory: path.resolve(__dirname, '..', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, '..', 'seeds')
        
    },
    pool: {
        afterCreate: (connection: any, done: Function) => {
            connection.run('PRAGMA foreign_keys = ON', done);
        }
    },
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
        port: Number(process.env.DATABASE_PORT || 5432),
        ssl: {rejectUnauthorized: false}
        //ssl reject unauthorized false need to be false due to hiroku restrictions
    },
};