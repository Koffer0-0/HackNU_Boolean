import { Request } from '../models/Request.js';
export async function getAllRequests(req, res) {
    try {
        const requests = await Request.find()
        res.status(200).json({data: requests});
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error getting requests' });
    }
}
export async function createRequest(req, res) {
    try {
        const { name, description, client, group, operator } = req.body;
        const candidate = await Request.findOne({ name });
        if (candidate) {
            return res.status(400).json({ message: 'Request already exists' });
        }
        const request = new Request({ name, description, client, group, operator, status: 'Not started'});
        const savedRequest = await request.save();
        res.status(201).json({data: savedRequest});
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error creating request' });
    }
}
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

export async function closeRequestById(req,res) {
    try {
        const { requestId } = req.params;
        const request = await Request.findByIdAndUpdate(
            requestId,
            { status: 'closed' },
            { new: true }
        );
        res.status(200).json(request);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error closing request' });
    }
}


export async function startRequestById(req,res) {
    try {
        const { requestId } = req.params;
        const request = await Request.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        if (request.status === 'closed') {
            request.status = 'in-progress';
            await request.save();
            res.status(200).json(request);
        } else if (request.status === 'in-progress') {
            return res.status(400).json({ message: 'Request already in progress' });
        } else {
            return res.status(400).json({ message: 'Invalid request status' });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error updating request' });
    }
}