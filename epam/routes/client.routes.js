import {Router} from 'express';
import {clientMarkRequestAsCompleted, getAllClients, getClient, getRequests} from "../controllers/clientController.js";

const router = Router()

router.get('/', getAllClients);
router.get('/:clientId', getClient);
router.get('/:clientId/requests', getRequests);
router.put('/client/complete-request/:requestId', clientMarkRequestAsCompleted);

export const clientRoutes = router