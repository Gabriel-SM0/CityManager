import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { IUser } from "../../database/models";
import { getByEmail } from "../../database/providers/user/GetByEmail";


interface IBodyProps extends Omit<IUser,'id' | 'name'>{}


export const signValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().required().min(3).max(100).email(),
        password: yup.string().required().min(1),
    })),
})); 


export const signUser = async (req: Request<{},{},IBodyProps>, res: Response) => {
    const result = await getByEmail(req.body.email);


    if (result instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            error: result.message
            
        })
    }

    return res.status(StatusCodes.ACCEPTED).json({token:"acessToken"})


}

// export const signPerson = async (req: Request<{},{},IPerson>, res: Response) => {
//     const result = await personProvider.create(req.body);

//     if (result instanceof Error) {
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//             error: {
//                 default: result.message
//             }
//         })
//     }

//     return res.status(StatusCodes.CREATED).json({
//         id: result
//     })
// }

