import { Router } from 'express';
import {getAllClients} from "../controllers/clientController.js";

const router = Router()

router.get('/', getAllClients);

export const clientRoutes = router