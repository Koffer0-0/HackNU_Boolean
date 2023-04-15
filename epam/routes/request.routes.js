import { Router } from 'express';

import {
    getAllActiveRequests,
    getAllClosedRequests,
    getAllNotStartedRequests,
    getAllClosedOperatorRequests,
    getAllActiveOperatorRequests,
    assignRequestToOperator,
} from '../controllers/requestController.js';
const router = Router()

router.get('/active', getAllActiveRequests);
router.get('/closed', getAllClosedRequests);
router.get('/not-started', getAllNotStartedRequests);
router.get('/operator/:operatorId/closed', getAllClosedOperatorRequests);
router.get('/operator/:operatorId/active', getAllActiveOperatorRequests);
router.post('/assign/:requestId', assignRequestToOperator);

export const requestRoutes = router