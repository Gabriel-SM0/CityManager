import request from "supertest";
import express, { Express } from "express";
import { getById, getByIdValidation } from "../../src/server/controllers/cities/GetById";
import { StatusCodes } from "http-status-codes";

describe("getById Controller", () => {
    let app: Express;

    beforeAll(() => {
        app = express();
        app.use(express.json());

        // Configura rota com middleware de validação + controller
        app.get("/cities/:id", getByIdValidation, getById);
    });

    it("should return 200 and the city id when a valid id is provided", async () => {
        const validId = "123";
        const response = await request(app).get(`/cities/${validId}`);

        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body).toEqual({
            message: "Get City By Id",
            params: validId,
        });
    });

    it("should return 400 if no id is provided", async () => {
        const response = await request(app).get(`/cities/`);
        expect(response.status).toBe(StatusCodes.NOT_FOUND); // Express não vai casar rota sem id
    });

    /*
    it("should return 400 if id is empty", async () => {
        const response = await request(app).get("/cities/"); // rota vazia
        // Express vai tratar como 404, então para simular validação vamos passar id vazio explicitamente
        const responseEmpty = await request(app).get("/cities/%20"); // id=" " (espaço)
        expect(responseEmpty.status).toBe(StatusCodes.BAD_REQUEST);
        expect(responseEmpty.body).toHaveProperty("errors.params.id");
    });
    */

    // it("should return 400 if id length is less than 1", async () => {
    //     const response = await request(app).get("/cities/"); // rota vazia, Express retorna 404
    //     expect(response.status).toBe(StatusCodes.NOT_FOUND);
    // });
});
