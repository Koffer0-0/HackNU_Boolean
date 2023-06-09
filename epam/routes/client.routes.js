import {Router} from 'express';
import {clientMarkRequestAsCompleted, getAllClients, getClient, getRequests} from "../controllers/clientController.js";

const router = Router()

router.get('/', getAllClients);
router.put('/client/complete-request/:requestId', clientMarkRequestAsCompleted);
router.get('/get/:clientId', getClient);
router.get('/get/:clientId/requests', getRequests);

export const clientRoutes = router