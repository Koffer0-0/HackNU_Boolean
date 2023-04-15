import { Request } from '../models/Request.js';
// TODO upbrat populate
export async function getAllActiveRequests(req, res) {
    try {
        const requests = await Request.find({ status: 'In Progress' })
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getAllClosedRequests(req, res) {
    try {
        const requests = await Request.find({ status: 'Closed' })
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getAllNotStartedRequests(req, res) {
    try {
        const requests = await Request.find({ status: 'Not Started' })
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getAllClosedOperatorRequests(req, res) {
    try {
        const { operatorId } = req.params;
        const requests = await Request.find({ status: 'closed', operator: operatorId })
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getAllActiveOperatorRequests(req, res) {
    try {
        const { operatorId } = req.params;
        const requests = await Request.find({ status: 'active', operator: operatorId })
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