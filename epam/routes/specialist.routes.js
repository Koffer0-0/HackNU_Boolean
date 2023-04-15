import { Router } from 'express';
import {getAllSpecialists} from "../controllers/specialistController.js";
const router = Router()

router.get('/', getAllSpecialists);

export const specialistRoutes = router