import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { JWTService } from "../services";


export const ensureAuthenticated: RequestHandler = async (req, res, next) => {

    const { authorization } = req.headers;
    /*
    same as: 
    const authorization = result.authorization;
    */

    console.log("Checking authentication")
    console.log(req.headers);
    console.log(authorization);
    console.log("Authentication checked above")


    if (!authorization) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: "Non authenticated"
            }
        })
    }

    const [type, token] = authorization?.split('');

    if (type !== 'Bearer') {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: "Token type differs from expected"
            }
        })
    }

    const jwtData = JWTService.verify(token)

    if (jwtData === 'JWT_SECRET_NOT_FOUND') {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: "Secret not found"
            }
        })
    } else if (jwtData === 'INVALID_TOKEN') {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: "Token type differs from expected"
            }
        })
    }
    console.log(jwtData)
    req.headers.idUser = jwtData.uid.toString();


    return next();

}