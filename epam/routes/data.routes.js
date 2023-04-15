import {Router} from 'express'
import {Client} from "../models/Client.js";
import {Operator} from "../models/Operator.js";
import {Specialist} from "../models/Specialist.js";
import {Request} from "../models/Request.js";
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
router.post('/create/requests', async (req, res) => {
    try {
        const { name, description, client, group } = req.body;
        const request = new Request({ name, description, client, group });
        const savedRequest = await request.save();
        res.status(201).json(savedRequest);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error creating request' });
    }
});

// Get all specialists
router.get('/specialists', async (req, res) => {
    try {
        const specialists = await Specialist.find();
        res.status(200).json(specialists);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error getting specialists' });
    }
});

// Get all operators
router.get('/operators', async (req, res) => {
    try {
        const operators = await Operator.find();
        res.status(200).json(operators);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error getting operators' });
    }
});

// Get all clients
router.get('/clients', async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).json(clients);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error getting clients' });
    }
});

// Get all requests
router.get('/requests', async (req, res) => {
    try {
        const requests = await Request.find();
        res.status(200).json(requests);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error getting requests' });
    }
});

// Get all specialist groups
router.get('/groups', async (req, res) => {
    try {
        const groups = await Group.find();
        res.status(200).json(groups);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error getting groups' });
    }
});
export const dataRouter = router