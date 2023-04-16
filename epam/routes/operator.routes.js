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
router.post('/create', createOperator);
router.post('/redirect-request', operatorRedirectRequestToBrigade);
router.put('/brigade/accept-request/:requestId', brigadeAcceptRequest);
router.put('/team/complete-request/:requestId', teamMarkRequestAsCompleted);
router.put('/operator/complete-request/:requestId', operatorMarkRequestAsCompleted);
router.get('/:operatorId', getOperator);
router.get('/:operatorId/closed-applications', getOperatorClosedApplications);
router.get('/:operatorId/active-requests', getOperatorActiveRequests);

export const operatorRoutes = router
