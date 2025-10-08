import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { CitiesController } from ".";
import { citiesProvider } from "../../database/providers/cities";



interface IParamsProps {
    id?: number;
}



export const deleteByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().min(1).required(),

    })),
})); 



export const deleteById = async (req: Request<IParamsProps>, res: Response) => {

    console.log(req.params.id);
    console.log("Deleting a City By Id Controller");
    console.log({params: req.params});


    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: {
                default: "ID need to be informed"
            }
        })

    }

    const result = await citiesProvider.deleteById(req.params.id);
    if (result instanceof Error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: result.message
        })

    }

    return res.status(StatusCodes.NO_CONTENT).json({ message: "Deleted City By Id", params: req.params.id});
    
}


