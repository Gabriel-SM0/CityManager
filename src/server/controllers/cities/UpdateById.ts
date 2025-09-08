import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";



interface IParamsProps {
    id?: string;
}

interface ICity {
    name: string;
    country: string;
    population: number;
}


export const updateByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.string().min(1).required(),

    })),
    body: getSchema<ICity>(yup.object().shape({
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

    return res.status(StatusCodes.OK).json({ message: "Update City By Id", params: req.params.id, body: req.body });
    
}


