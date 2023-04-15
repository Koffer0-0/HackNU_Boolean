import { Router } from 'express';
import {
    getAllRequests,
    getAllActiveRequests,
    getAllClosedRequests,
    getAllNotStartedRequests,
    getAllClosedOperatorRequests,
    getAllActiveOperatorRequests,
    assignRequestToOperator, createRequest, closeRequestById, startRequestById,
} from '../controllers/requestController.js';
const router = Router()

router.get('/', getAllRequests);
router.get('/:id', getAllRequests);
router.get('/closed', getAllClosedRequests);
router.put('/:requestId/close', closeRequestById);
router.put('/:requestId/start', startRequestById);
router.get('/not-started', getAllNotStartedRequests);
router.get('/operator/:operatorId/closed', getAllClosedOperatorRequests);
router.get('/operator/:operatorId/active', getAllActiveOperatorRequests);
router.post('/create', createRequest);
router.post('/assign/:requestId', assignRequestToOperator);



export const requestRoutes = router