import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { personProvider } from "../../database/providers/person";
import { IUser } from "../../database/models";
import { userProvider } from "../../database/providers/user";


interface IBodyProps extends Omit<IUser,'id'>{

}


export const signUpValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().min(1).required(),
      email: yup.string().email().required(),
      password: yup.string().min(6).required(),
    })
  ),
}));


export const signUp = async (req:Request<{},{},IBodyProps>, res: Response) => {


    const result = await userProvider.create(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: result.message
        })
    }

    return res.status(StatusCodes.CREATED).json({
        message: `Created user with id: ${result}`
    })

}






