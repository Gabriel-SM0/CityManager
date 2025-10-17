import { Router } from "express";
import { StatusCodes } from 'http-status-codes';
import { citiesController, personController, userController } from "../controllers";
import { ensureAuthenticated } from "../shared/middleware";

const router = Router();


router.get('/', (_, res) => {
    return res.send('Hello, new World!');
} );

router.post('/printMe', (req, res) => {
    console.log(req.body);
    return res.status(StatusCodes.UNAUTHORIZED).json(req.body);
    // Logic to add a new city would go here
} )

//private route
router.post('/cities',ensureAuthenticated, citiesController.createValidation,citiesController.createCity);
router.get('/cities',ensureAuthenticated, citiesController.getAllValidation,citiesController.getAll);
router.get('/cities/:id',ensureAuthenticated, citiesController.getByIdValidation,citiesController.getById);
router.put('/cities/:id',ensureAuthenticated, citiesController.updateByIdValidation,citiesController.updateById);
router.delete('/cities/:id',ensureAuthenticated, citiesController.deleteByIdValidation,citiesController.deleteById)

//private route
router.post('/person',ensureAuthenticated,personController.createValidation, personController.createPerson)
router.get('/person/:id',ensureAuthenticated, personController.getByIdValidation,personController.getById);
router.get('/person',ensureAuthenticated, personController.getAllValidation,personController.getAll);
router.put('/person/:id',ensureAuthenticated, personController.updateByIdValidation,personController.updateById);
router.delete('/person/:id',ensureAuthenticated, personController.deleteByIdValidation,personController.deleteById)


//public rount
router.post('/user', userController.signUpValidation, userController.signUp);
router.get('/user', userController.signValidation, userController.signUser);


export { router };
