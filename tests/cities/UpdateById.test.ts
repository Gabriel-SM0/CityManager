import request from "supertest";
import express, { Express } from "express";
import { updateById, updateByIdValidation } from "../../src/server/controllers/cities/UpdateById";
import { StatusCodes } from "http-status-codes";

describe("updateById Controller", () => {
    let app: Express;

    beforeAll(() => {
        app = express();
        app.use(express.json());

        // Rota configurada com middleware de validação + controller
        app.put("/cities/:id", updateByIdValidation, updateById);
    });

    it("should return 200 when valid id and body are provided", async () => {
        const validId = "123";
        const validBody = {
            name: "Updated City",
            country: "Updated Country",
            population: 500000
        };

        const response = await request(app)
            .put(`/cities/${validId}`)
            .send(validBody);

        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body).toEqual({
            message: "Update City By Id",
            params: validId,
            body: validBody
        });
    });
/*
    it("should return 400 if id is missing or empty", async () => {
        const validBody = {
            name: "City",
            country: "Country",
            population: 1000
        };

        // Rota sem id não casa, Express retorna 404
        const response = await request(app).put("/cities/").send(validBody);
        expect(response.status).toBe(StatusCodes.NOT_FOUND);

        // Passando id inválido (espaço) para testar validação
        const responseEmpty = await request(app).put("/cities/%20").send(validBody);
        expect(responseEmpty.status).toBe(StatusCodes.BAD_REQUEST);
        expect(responseEmpty.body).toHaveProperty("errors.params.id");
    });
*/
    it("should return 400 if body is missing required fields", async () => {
        const validId = "123";

        const invalidBody = {}; // vazio
        const response = await request(app)
            .put(`/cities/${validId}`)
            .send(invalidBody);

        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body.errors.body).toHaveProperty("name");
        expect(response.body.errors.body).toHaveProperty("country");
        expect(response.body.errors.body).toHaveProperty("population");
    });

    it("should return 400 if body fields are invalid", async () => {
        const validId = "123";

        const invalidBody = {
            name: "a", // < 3 caracteres
            country: "b", // < 3 caracteres
            population: 0 // < 1
        };

        const response = await request(app)
            .put(`/cities/${validId}`)
            .send(invalidBody);

        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body.errors.body).toHaveProperty("name");
        expect(response.body.errors.body).toHaveProperty("country");
        expect(response.body.errors.body).toHaveProperty("population");
    });
});
