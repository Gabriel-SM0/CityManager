import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { IUser } from "../../database/models";
import { getByEmail } from "../../database/providers/user/GetByEmail";
import { JWTService, verifyPassword } from "../../shared/services";


interface IBodyProps extends Omit<IUser, 'id' | 'name'> { }


export const signValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().required().min(3).max(100).email(),
        password: yup.string().required().min(1),
    })),
}));


export const signUser = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const user = await getByEmail(req.body.email);


    if (user instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            error: "Invalid email or password"

        })
    }

    const IsPasswordStatus = await verifyPassword(req.body.password, user.password);

    if (!IsPasswordStatus) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            error: "Invalid Email or password"
        })
    } else {

        const acessToken = JWTService.sign({
            uid: user.id
        })

        if (acessToken === 'JWT_SECRET_NOT_FOUND' || acessToken === 'INVALID_TOKEN') {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: 'Issue generating the acess token'
                }
            })

        } else {
            return res.status(StatusCodes.OK).json({ acessToken }).send()
        }

    }
}

