import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { personProvider } from "../../database/providers/person";



interface IParamsProps {
    id?: number;
}



export const getByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().min(1).required(),

    })),

})); 



export const getById = async (req: Request<IParamsProps>, res: Response) => {
    console.log(req.params);
    console.log("Get person By Id Controller");
    console.log({params: req.params});

    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: "ID need to be informed"
            }
        })
    }

    const result = await personProvider.getById(req.params.id);

    if (result instanceof Error) {
        return res.status(StatusCodes.BAD_GATEWAY).json({
            errors: {
                default: result.message
            }
        })
    }


    return res.status(StatusCodes.OK).json(result);

}


