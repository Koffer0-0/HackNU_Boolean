import {Router} from 'express';
import {createOperator, getAllOperators, getOperator} from "../controllers/operatorController.js";

const router = Router()

router.get('/', getAllOperators);
router.get('/:id', getOperator);
router.post('/create', createOperator);

export const operatorRoutes = router