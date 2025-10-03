import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { IPerson } from "../../database/models";
import { personProvider } from "../../database/providers/person";


interface IBodyProps extends Omit<IPerson,'id'>{}


export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().required().min(3).max(100),
        cityId: yup.number().required().min(1).max(100),
        fullName: yup.string().required().min(1),
    })),

})); 


export const createPerson = async (req: Request<{},{},IPerson>, res: Response) => {

    const result = await personProvider.create(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: {
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.CREATED).json({
        id: result
    })

}

