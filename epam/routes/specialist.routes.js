import {Router} from 'express';
import {createSpecialist, getAllSpecialists, getSpecialist} from "../controllers/specialistController.js";

const router = Router()

router.get('/', getAllSpecialists);
router.post('/create', createSpecialist);
router.get('/:id', getSpecialist);

export const specialistRoutes = router