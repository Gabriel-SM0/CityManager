import { Request, Response } from "express";


interface ICity {
    name: string;
    country: string;
    population: number;
}

export const createCityController = (req: Request<{},{},ICity>, res: Response) => {

    const data = req.body;

    console.log(`Creating city with data: ${data.name}`);
    return res.status(201).json(
        { message: `${data.name} created successfully` });
    // Logic to create a new city would go here 
};