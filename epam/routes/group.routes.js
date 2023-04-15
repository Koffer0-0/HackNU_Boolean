import { Router } from 'express';
import {createGroup, getAllGroups} from "../controllers/groupController.js";

const router = Router()

router.get('/', getAllGroups);
router.post('/create', createGroup);

export const groupRoutes = router