import {Group} from "../models/Group.js";
export async function getAllGroups(req, res) {
    try {
        const groups = await Group.find();
        res.status(200).json({data: groups});
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error getting clients' });
    }
}

export async function createGroup(req, res) {
    try {
        const { name, specialists } = req.body;
        const group = new Group({ name, specialists });
        const savedGroup = await group.save();
        res.status(201).json(savedGroup);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error creating group' });
    }
}

