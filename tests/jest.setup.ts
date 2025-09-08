import supertest from 'supertest';

import { server } from '../src/server/ServerFile';


export const testServer = supertest(server);


//testServer.get('/cities').expect(200).send('Hello World');