import request from "supertest";
import express, { Express } from "express";
import { deleteById, deleteByIdValidation } from "../../src/server/controllers/cities/DeleteById";

describe("deleteById Controller", () => {
    let app: Express;

    beforeAll(() => {
        app = express();
        app.use(express.json());
        app.delete(
            "/cities/:id",
            deleteByIdValidation,
            deleteById
        );
    });



    it("should return 400 and error when id does not exist", async () => {
    const response = await request(app).delete("/cities/1");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
        errors: "No register found to delete",
    });
});


    // it("should return 400 when id param is missing", async () => {
    //     const response = await request(app).delete("/cities/");
    //     expect(response.status).toBe(404); // Express default for missing route
    // });

    // it("should return 400 when id param is empty", async () => {
    //     const response = await request(app).delete("/cities/");
    //     expect(response.status).toBe(404); // Express default for missing route
    // });

    // it("should return 400 when id param is not valid (empty string)", async () => {
    //     const response = await request(app).delete("/cities/");
    //     expect([400, 404]).toContain(response.status);
    // });
});

