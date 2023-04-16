import {Group} from "../models/Group.js";
import { Request } from '../models/Request.js';

// 15) Get the list of all brigades
export async function getAllGroups(req, res) {
    try {
        const groups = await Group.find();
        res.status(200).json({data: groups});
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error getting clients' });
    }
}

export async function getGroup(req, res) {
    try {
        const groupId = req.params.id;
        const group = await Group.findById(groupId);
        res.status(200).json({data: group});
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
        res.status(201).json({ data: savedGroup});
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error creating group' });
    }
}

// 16) Get the list of all closed applications of the brigade
export async function getClosedGroupRequests(req, res) {
    try {
        const groupId = req.params.groupId;
        const requests = await Request.find({ group: groupId, status: 'completed' });
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// 17) Get the list of all active applications of the brigade
export async function getActiveGroupRequests(req, res) {
    try {
        const groupId = req.params.groupId;
        const requests = await Request.find({ group: groupId, status: 'active' });
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

