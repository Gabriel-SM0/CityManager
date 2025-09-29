import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { ICity } from "../../database/models";
import { citiesProvider } from "../../database/providers/cities";


interface IBodyProps extends Omit<ICity,'id'>{}



export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().required().min(3).max(100),
        country: yup.string().required().min(3).max(100),
        population: yup.number().required().min(1),
    })),

})); 


export const createCity = async (req: Request<{},{},ICity>, res: Response) => {

    const result = await citiesProvider.create(req.body);
    
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: {
                default: result.message
            }
        });
    }

    const data = req.body;
    console.log(`Creating city with name: ${data.name}`);
    return res.status(StatusCodes.CREATED).json({ id: result });

}

