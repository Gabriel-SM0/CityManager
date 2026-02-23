import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { personProvider } from "../../database/providers/person";


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


export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {

  console.log("Get All Person Controller");

  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 10);
  const filter = req.query.filter ?? '';

    console.log({
        page: page,
        limit: limit,
        filter: filter
    });

  if (isNaN(page) || isNaN(limit)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "Invalid pagination parameters"
      }
    });
  }

  const result = await personProvider.getAll(page, limit, filter);
  const count = await personProvider.count(filter);

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

  return res.status(StatusCodes.OK).json(result);
};