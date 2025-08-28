import { testServer } from '../jest.setup';

describe('Create City', () => {
    it('should create a city successfully', async () => {
        const response = await testServer.post('/cities').send({
            name: 'Test City',
            country: 'Test Country',
            population: 1000000
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('Test City');

    });

    // it('should return 400 if required fields are missing', async () => {
    //     const response = await testServer.post('/cities').send({
    //         name: 'Incomplete City'
    //         // Missing country and population
    //     });

    //     expect(response.status).toBe(400);
    //     expect(response.body).toHaveProperty('error');
    // });

    // it('should return 400 if population has invalid type', async () => {
    //     const response = await testServer.post('/cities').send({
    //         name: 'Error City',
    //         country: 'Error Country',
    //         population: 'not-a-number'
    //     });

    //     expect(response.status).toBe(400);
    //     expect(response.body).toHaveProperty('error');
    // });
});
