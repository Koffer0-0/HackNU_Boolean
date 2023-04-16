import {Router} from 'express';
import {createGroup, getAllGroups, getGroup} from "../controllers/groupController.js";

const router = Router()

router.get('/', getAllGroups);
router.get('/:id', getGroup);
router.post('/create', createGroup);

export const groupRoutes = router