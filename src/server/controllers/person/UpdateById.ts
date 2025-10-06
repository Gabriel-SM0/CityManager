import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { IPerson } from "../../database/models";
import { personProvider } from "../../database/providers/person";



interface IParamsProps {
    id?: number;
}

interface IBodyProps extends Omit<IPerson, 'id'> {
    email: string;
    fullName: string;
    cityId: number;
}


export const updateByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().min(1).required(),

    })),
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().required().min(3).max(100),
        cityId: yup.number().required().min(1).max(100),
        fullName: yup.string().required().min(1),
    })),

}));



export const updateById = async (req: Request<IParamsProps>, res: Response) => {

    console.log(`Trying to edit on person with id: ${req.params.id}`);
    console.log(req.body);
    console.log({ params: req.params.id, body: req.body });


    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: "ID need to be informed"
            }
        })
    }

    const result = await personProvider.updateById(req.params.id, req.body);

    if (result instanceof Error) {

        if (result.message?.includes('No person')) {
            return res.status(StatusCodes.NOT_FOUND).json({
                error: result.message
            })
        } else {

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: result.message
            })
        }

    }

    return res.sendStatus(StatusCodes.NO_CONTENT);

}


