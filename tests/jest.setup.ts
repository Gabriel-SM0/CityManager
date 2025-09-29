import supertest from 'supertest';

import { server } from '../src/server/ServerFile';
//import { Knex } from 'knex';
import { Knex } from '../src/server/database/index'


beforeAll(async () => {
    await Knex.migrate.latest();
})

export const testServer = supertest(server);


afterAll(async () => {
    await Knex.destroy();
})

//testServer.get('/cities').expect(200).send('Hello World');