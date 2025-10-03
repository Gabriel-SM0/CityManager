import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { personProvider } from "../../database/providers/person";


interface IQueryProps {
    id?: number;
    page?: number;
    limit?: number;
    filter?: string;

}



export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        id: yup.number().optional().min(1).moreThan(0),
        page: yup.number().optional().min(1).default(1).moreThan(0),
        limit: yup.number().optional().min(1).default(10).moreThan(0),
        filter: yup.string().optional().min(3)
    })),

})); 



export const getAll = async (req: Request<{},{},{},IQueryProps>, res: Response) => {


    const result = await personProvider.getAll(req.query.page || 1, req.query.limit || 7, req.query.filter || '')
    const count = await personProvider.count(req.query.filter || '')


    if (result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message
            }
        })
    } else if (count instanceof Error) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: count.message
            }

        })
    }

    res.setHeader("access-control-expose-headers", "X-Total-Count");
    res.setHeader("X-Total-Count", count);
    console.log(req.query);

    console.log("Get All person Controller");
    console.log({query: req.query});

    return res.status(StatusCodes.OK).json(result);


}

