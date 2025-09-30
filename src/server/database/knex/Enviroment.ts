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
    ...development
};