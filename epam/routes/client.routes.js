import {Router} from 'express';
import {getAllClients, getClient, getRequests} from "../controllers/clientController.js";

const router = Router()

router.get('/', getAllClients);
router.get('/:id', getClient);
router.get('/:id/requests', getRequests);

export const clientRoutes = router