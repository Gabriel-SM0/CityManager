import {knex} from 'knex';

import { development, production, test } from './knex/Enviroment';


const getEnviroment = () => {
    switch (process.env.NODE_ENV) {
        case 'development' :
            return development;
        case 'test' :
            return test;
        default: return production;
}
}




export const Knex = knex(getEnviroment());