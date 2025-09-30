import request from "supertest";
import express, { Express } from "express";
import * as UpdateController from "../../src/server/controllers/cities/UpdateById";
import { StatusCodes } from "http-status-codes";

describe("updateById Controller", () => {
    let app: Express;

    beforeAll(() => {
        app = express();
        app.use(express.json());

        // mock do controller
    jest.spyOn(UpdateController, "updateById").mockImplementation((req, res) => {
        return Promise.resolve(
            res.status(StatusCodes.OK).json({
                message: "Update City By Id",
                params: req.params.id,
                body: req.body,
            })
        );
    });


        app.put("/cities/:id", UpdateController.updateByIdValidation, UpdateController.updateById);
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
});
