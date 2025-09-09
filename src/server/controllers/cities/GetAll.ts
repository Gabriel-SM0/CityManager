import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";


interface IQueryProps {
    page?: number;
    limit?: number;
    filter?: string;

}



export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().optional().min(1).default(1).moreThan(0),
        limit: yup.number().optional().min(1).default(10).moreThan(0),
        filter: yup.string().optional().min(3)
    })),

})); 



export const getAll = async (req: Request<{},{},{},IQueryProps>, res: Response) => {
    console.log(req.query);

    console.log("Get All Cities Controller");
    console.log({query: req.query});

    return res.status(StatusCodes.OK).json({ message: "Get All Cities", query: req.query });

}

