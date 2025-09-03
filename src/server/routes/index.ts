import { Router } from "express";
import { StatusCodes } from 'http-status-codes';
import { citiesController } from "../controllers";

const router = Router();


router.get('/', (_, res) => {
    return res.send('Hello, new World!');
} );

router.post('/printMe', (req, res) => {
    console.log(req.body);
    return res.status(StatusCodes.UNAUTHORIZED).json(req.body);
    // Logic to add a new city would go here
} )

router.post('/cities', citiesController.createValidation,
     citiesController.createCity
);


export { router };
