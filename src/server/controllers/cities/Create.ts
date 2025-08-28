import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";


interface ICity {
    name: string;
    country: string;
    population: number;
}


const bodyValidationSchema: yup.Schema<ICity> = yup.object().shape({
    name: yup.string().required().min(3),
    country: yup.string().required().min(3),
    population: yup.number().required().min(10)
})

export const createCityController = async (req: Request<{},{},ICity>, res: Response) => {

    let validateData: ICity | undefined = undefined;

    try {
        validateData = await bodyValidationSchema.validate(req.body, { abortEarly: false });
    } catch (err) {
        const yupError = err as yup.ValidationError;
        const ValidationErrors: Record<string, string> = {};


        yupError.inner.forEach(error => {
            if (error.path === undefined) return;
            ValidationErrors[error.path] = error.message;
        });

        return res.status(StatusCodes.BAD_REQUEST).json(
            { errors: ValidationErrors
            });
    }

    const data = req.body;

    console.log(`Creating city with data: ${data.name}`);
    return res.status(201).json(
        { message: `${data.name} created successfully` });
    // Logic to create a new city would go here 
};