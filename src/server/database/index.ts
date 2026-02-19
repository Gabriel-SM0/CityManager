import {knex} from 'knex';
import pg from 'pg';
import 'dotenv/config';

import { development, production, test } from './knex/Enviroment';


if (process.env.NODE_ENV === 'production') {
    pg.types.setTypeParser(20, 'text', parseInt)
}

const getEnviroment = () => {
    switch (process.env.NODE_ENV) {
        case 'development' :
            return development;
        case 'test' :
            return test;
        default: return production;
}
}


export const KnexConection = knex(getEnviroment());