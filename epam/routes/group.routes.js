import {Router} from 'express';
import {
    createGroup,
    getActiveGroupRequests,
    getAllGroups,
    getClosedGroupRequests,
    getGroup
} from "../controllers/groupController.js";

const router = Router()

router.get('/', getAllGroups);
router.get('/:groupId', getGroup);
router.get('/:groupId/closed-requests', getClosedGroupRequests);
router.get('/:groupId/active-requests', getActiveGroupRequests);

export const groupRoutes = router