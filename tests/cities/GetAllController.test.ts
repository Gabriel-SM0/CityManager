import request from "supertest";
import express, { Express } from "express";
import { getAll, getAllValidation } from "../../src/server/controllers/cities/GetAll";
import { StatusCodes } from "http-status-codes";

describe("getAll Controller", () => {
    let app: Express;

    beforeAll(() => {
        app = express();
        app.use(express.json());
        app.get(
            "/cities",
            getAllValidation,
            getAll
        );
    });

    /*

    it("should return 200 with default query params when none are provided", async () => {
        const response = await request(app).get("/cities");

        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body).toEqual({
            message: "Get All Cities",
            query: {

            }
        });
    });
    */

    it("should return 200 with all provided valid query params", async () => {
        const page = "5";
        const limit = "20";
        const filter = "testfilter";
        const response = await request(app).get(`/cities?page=${page}&limit=${limit}&filter=${filter}`);

        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body).toEqual({
            message: "Get All Cities",
            query: {
                page: page, // Espera o número 5
                limit: limit, // Espera o número 20
                filter: filter,
            }
        });
    });

    // it("should return 400 if 'page' is less than 1", async () => {
    //     const response = await request(app).get("/cities?page=0");
    //     expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    //     expect(response.body).toHaveProperty("errors.query.page");
    // });

    // it("should return 400 if 'limit' is less than 1", async () => {
    //     const response = await request(app).get("/cities?limit=0");
    //     expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    //     expect(response.body).toHaveProperty("errors.query.limit");
    // });

    // it("should return 400 if 'filter' length is less than 3", async () => {
    //     const response = await request(app).get("/cities?filter=ab");
    //     expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    //     expect(response.body).toHaveProperty("errors.query.filter");
    // });

    // it("should return 400 if 'page' is not a number", async () => {
    //     const response = await request(app).get("/cities?page=abc");
    //     expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    //     expect(response.body).toHaveProperty("errors.query.page");
    // });
});