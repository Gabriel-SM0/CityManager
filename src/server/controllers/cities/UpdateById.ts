import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { ICity } from "../../database/models";
import { citiesController } from ".";
import { citiesProvider } from "../../database/providers/cities";



interface IParamsProps {
    id?: number;
}

interface IBodyProps extends Omit<ICity, 'id'>{
    name: string;
    country: string;
    population: number;
}


export const updateByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().min(1).required(),

    })),
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().required().min(3).max(100),
        country: yup.string().required().min(3).max(100),
        population: yup.number().required().min(1),
    })),

})); 



export const updateById = async (req: Request<IParamsProps>, res: Response) => {

    console.log(req.params.id);
    console.log(req.body);
    console.log("Update City By Id Controller");
    console.log({params: req.params, body: req.body});


    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            erros: {
                default: "ID need to be informed"
            }
        })
    }

    const result = await citiesProvider.updateById(req.params.id,req.body);
    
    if (result instanceof Error) {
        return res.status(StatusCodes.BAD_GATEWAY).json({
            errors: result.message
        })
    }

    return res.status(StatusCodes.NO_CONTENT).json({ message: "Update City By Id", params: req.params.id, body: req.body });
    
}


