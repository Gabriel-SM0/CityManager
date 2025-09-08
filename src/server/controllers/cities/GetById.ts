import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";



interface IParamsProps {
    id?: string;
}



export const getByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.string().min(1).required(),

    })),

})); 



export const getById = async (req: Request<IParamsProps>, res: Response) => {
    console.log(req.params);
    console.log("Get City By Id Controller");
    console.log({params: req.params});

    return res.status(StatusCodes.OK).json({ message: "Get City By Id", params: req.params.id });

}


