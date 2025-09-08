import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

type TProperty = "body" | "query" | "params" | "headers";

type TAllSchemas = Record<TProperty, yup.ObjectSchema<any>>;

type TGetSchema = <T extends yup.Maybe<yup.AnyObject>>(schema: yup.ObjectSchema<T>) => yup.ObjectSchema<any>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;




export const validation: TValidation = (getAllSchemas) => async (req, res, next) => {
    const schemas = getAllSchemas((schema) => schema)
    
    console.log("Validation Middleware");
    const errorsResult: Record<string, Record<string, string>> = {};

    for (const [key, schema] of Object.entries(schemas)) {
        try {
            schema.validateSync(req[key as TProperty], { abortEarly: false });
        } catch (err) {
            const yupError = err as yup.ValidationError;
            const validationErrors: Record<string, string> = {};
            yupError.inner.forEach((error) => {
                if (error.path === undefined) return;
                validationErrors[error.path] = error.message;
            });
            errorsResult[key] = validationErrors;
        }
    }

    if (Object.keys(errorsResult).length > 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult });
    }

    return next();
};
