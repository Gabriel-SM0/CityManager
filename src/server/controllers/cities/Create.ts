import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";


interface ICity {
    name: string;
    country: string;
    population: number;
}

interface IFilter {
    filter?: string;
}

export const createValidation = validation((getSchema) => ({
    body: getSchema<ICity>(yup.object().shape({
        name: yup.string().required().min(3).max(100),
        country: yup.string().required().min(3).max(100),
        population: yup.number().required().min(1)
    })),
    query: getSchema<IFilter>(yup.object().shape({
        filter: yup.string().optional().min(3)
    })),
})); 

export const createCity = async (req: Request<{},{},ICity>, res: Response) => {

    const data = req.body;
    console.log(`Creating city with data: ${data.name}`);
    return res.status(201).json(
        { message: `${data.name} created successfully` });
    // Logic to create a new city would go here 
}

