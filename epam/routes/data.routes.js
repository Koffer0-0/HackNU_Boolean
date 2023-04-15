import {Router} from 'express'
import {Group} from "../models/Group.js";

const router = Router()

router.post('/create/groups', async (req, res) => {
    try {
        const { name, specialists } = req.body;
        const group = new Group({ name, specialists });
        const savedGroup = await group.save();
        res.status(201).json(savedGroup);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error creating group' });
    }
});


export const dataRouter = router