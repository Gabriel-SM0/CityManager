import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { IUser } from "../../database/models";
import { getByEmail } from "../../database/providers/user/GetByEmail";
import { verifyPassword } from "../../shared/services";


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
            error: "Invalid email or password"
            
        })
    }
    
    const passwordStatus = await verifyPassword(req.body.password,result.password);

    if (!passwordStatus) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            error: "Invalid Email or password"
        })
    }else {
        return res.status(StatusCodes.OK).json({token:"acessToken"}).send()

    }



}

