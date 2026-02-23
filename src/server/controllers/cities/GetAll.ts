import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { citiesProvider } from "../../database/providers/cities";


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



export const getAll = async (req: Request<{}, {}, {}, IQueryProps>,res: Response) => {

  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 10);
  const filter = req.query.filter ?? '';
  const id = req.query.id !== undefined ? Number(req.query.id) : undefined;

  if (isNaN(page) || isNaN(limit) || (id !== undefined && isNaN(id))) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: { default: "Invalid query parameters" }
    });
  }

  const result = await citiesProvider.getAll(page, limit, filter, id);
  const count = await citiesProvider.count(filter);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message }
    });
  }

  if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: count.message }
    });
  }

  res.setHeader("access-control-expose-headers", "X-Total-Count");
  res.setHeader("X-Total-Count", count);

  console.log("Get All Cities Controller");
  console.log({query: req.query});

  return res.status(StatusCodes.OK).json(result);
};