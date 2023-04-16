import {Router} from 'express';
import {
    assignRequestToOperator,
    closeRequestById, createRequest, getAllActiveOperatorRequests,
    getAllActiveRequests, getAllClosedOperatorRequests,
    getAllClosedRequests, getAllNotStartedRequests,
    getAllRequests, getRequestById, startRequestById
} from "../controllers/requestController.js";

const router = Router()

router.get('/', getAllRequests);
router.get('/active', getAllActiveRequests);
router.get('/closed', getAllClosedRequests);
router.get('/waiting', getAllNotStartedRequests);
router.post('/create', createRequest);
router.post('/assign/:requestId/operator/:operatorId', assignRequestToOperator);
router.get('/:requestId', getRequestById);
router.put('/:requestId/close', closeRequestById);
router.put('/:requestId/active', startRequestById);
router.get('/operator/:operatorId/closed', getAllClosedOperatorRequests);
router.get('/operator/:operatorId/active', getAllActiveOperatorRequests);

export const requestRoutes = router