import Test from 'supertest/lib/test';
import { testServer } from '../jest.setup';

describe('Create City', () => {
    let cityName: string = "Test City";
    
    it('should create a city successfully', async () => {
        const response = await testServer.post('/cities').send({
            name: cityName,
            country: 'Test Country',
            population: 1000000
        });

        expect(response.status).toBe(201);

        //expect(response.body).toEqual({ message: `${cityName} created successfully` });

    });
 

});
