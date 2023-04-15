import { Request } from '../models/Request.js';

export async function getAllActiveRequests(req, res) {
    try {
        const requests = await Request.find({ status: 'active' }).populate('client operator');
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getAllClosedRequests(req, res) {
    try {
        const requests = await Request.find({ status: 'closed' }).populate('client operator');
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getAllNotStartedRequests(req, res) {
    try {
        const requests = await Request.find({ status: 'not_started' }).populate('client');
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getAllClosedOperatorRequests(req, res) {
    try {
        const { operatorId } = req.params;
        const requests = await Request.find({ status: 'closed', operator: operatorId }).populate('client');
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getAllActiveOperatorRequests(req, res) {
    try {
        const { operatorId } = req.params;
        const requests = await Request.find({ status: 'active', operator: operatorId }).populate('client');
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function assignRequestToOperator(req,res) {
    try {
        const { requestId } = req.params;
        const { operatorId } = req.body;
        const request = await Request.findById(requestId);

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        request.operator = operatorId;
        request.status = 'active';

        const updatedRequest = await request.save();
        res.status(200).json(updatedRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}