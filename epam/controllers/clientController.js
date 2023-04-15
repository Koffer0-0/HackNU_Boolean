import { Client } from '../models/Client.js';
export async function getAllClients(req, res) {
    try {
        const clients = await Client.find();
        res.status(200).json({data: clients});
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error getting clients' });
    }
}
