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

router.post('/cities', citiesController.createValidation,citiesController.createCity);
router.get('/cities', citiesController.getAllValidation,citiesController.getAll);
router.get('/cities/:id', citiesController.getByIdValidation,citiesController.getById);
router.put('/cities/:id', citiesController.updateByIdValidation,citiesController.updateById);
router.delete('/cities/:id', citiesController.deleteByIdValidation,citiesController.deleteById)

export { router };
