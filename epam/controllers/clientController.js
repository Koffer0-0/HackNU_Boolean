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
        const clientId = req.params;
        const client = await Client.findById(clientId);
        res.status(200).json({data: client});
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error getting clients' });
    }
}

//gets all the requests of a client
export async function getRequests(req, res) {
    try {
        const {clientId} = req.params;
        const client = await Client.findById(clientId);
        const requests = await Request.find({client: client.clientId});
        res.status(200).json({data: requests});
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error getting requests of client' });
    }
}

// 20) The client marks the request as completed
export async function clientMarkRequestAsCompleted(req, res) {
    try {
        const requestId = req.params;
        const request = await Request.findByIdAndUpdate(
            requestId,
            { clientCompleted: true },
            { new: true }
        );
        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}