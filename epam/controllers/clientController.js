import {Client} from '../models/Client.js';
import {Request} from "../models/Request.js";

export async function getAllClients(req, res) {
    try {
        const clients = await Client.find();
        res.status(200).json({data: clients});
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error getting clients' });
    }
}

export async function getClient(req, res) {
    try {
        const id = req.params.id;
        const client = await Client.findById(id);
        res.status(200).json({data: client});
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error getting clients' });
    }
}

export async function getRequests(req, res) {
    try {
        const id = req.params.id;
        const client = await Client.findById(id);
        const requests = await Request.find({client: client._id});
        res.status(200).json({data: requests});
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error getting requests of client' });
    }
}
