import request from "supertest";
import express, { Express } from "express";
import * as GetAllController from "../../src/server/controllers/cities/GetAll";
import { StatusCodes } from "http-status-codes";

describe("getAll Controller", () => {
    let app: Express;

    beforeAll(() => {
        app = express();
        app.use(express.json());

        // Mock do controller para não depender do banco
        jest.spyOn(GetAllController, "getAll").mockImplementation(
            async (req, res) => {
                return res.status(StatusCodes.OK).json({
                    message: "Get All Cities",
                    query: req.query, // retorna exatamente o que chegou
                });
            }
        );

        app.get(
            "/cities",
            GetAllController.getAllValidation,
            GetAllController.getAll
        );
    });

    it("should return 200 with all provided valid query params", async () => {
        const page = "5";
        const limit = "20";
        const filter = "testfilter";

        const response = await request(app).get(
            `/cities?page=${page}&limit=${limit}&filter=${filter}`
        );

        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body).toEqual({
            message: "Get All Cities",
            query: { page, limit, filter },
        });
    });
});
