import { Router } from "express";
import { StatusCodes } from 'http-status-codes';
import { CitiesController, PersonController } from "../controllers";

const router = Router();


router.get('/', (_, res) => {
    return res.send('Hello, new World!');
} );

router.post('/printMe', (req, res) => {
    console.log(req.body);
    return res.status(StatusCodes.UNAUTHORIZED).json(req.body);
    // Logic to add a new city would go here
} )

router.post('/cities', CitiesController.createValidation,CitiesController.createCity);
router.get('/cities', CitiesController.getAllValidation,CitiesController.getAll);
router.get('/cities/:id', CitiesController.getByIdValidation,CitiesController.getById);
router.put('/cities/:id', CitiesController.updateByIdValidation,CitiesController.updateById);
router.delete('/cities/:id', CitiesController.deleteByIdValidation,CitiesController.deleteById)

router.post('/person',PersonController.createValidation, PersonController.createPerson)
router.get('/person/:id', PersonController.getByIdValidation,PersonController.getById);
router.get('/person', PersonController.getAllValidation,PersonController.getAll);
router.put('/person/:id', PersonController.updateByIdValidation,PersonController.updateById);
router.delete('/person/:id', PersonController.deleteByIdValidation,PersonController.deleteById)


export { router };
