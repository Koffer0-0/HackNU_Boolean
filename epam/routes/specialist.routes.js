import {Router} from 'express';
import {createSpecialist, getAllSpecialists, getSpecialist} from "../controllers/specialistController.js";

const router = Router()

router.get('/', getAllSpecialists);
router.get('/:id', getSpecialist);
router.post('/create', createSpecialist);

export const specialistRoutes = router