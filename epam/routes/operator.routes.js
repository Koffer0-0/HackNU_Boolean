import {Router} from 'express';
import {
    createOperator,
    getAllOperators,
    getOperator, getOperatorActiveRequests,
    getOperatorClosedApplications
} from "../controllers/operatorController.js";
import {
    brigadeAcceptRequest, operatorMarkRequestAsCompleted,
    operatorRedirectRequestToBrigade,
    teamMarkRequestAsCompleted
} from "../controllers/requestController.js";

const router = Router()

router.get('/', getAllOperators);
router.get('/:operatorId', getOperator);
router.post('/create', createOperator);
router.get('/:operatorId/closed-applications', getOperatorClosedApplications);
router.get('/:operatorId/active-requests', getOperatorActiveRequests);
router.post('/redirect-request', operatorRedirectRequestToBrigade);
router.put('/brigade/accept-request/:requestId', brigadeAcceptRequest);
router.put('/team/complete-request/:requestId', teamMarkRequestAsCompleted);
router.put('/operator/complete-request/:requestId', operatorMarkRequestAsCompleted);

export const operatorRoutes = router