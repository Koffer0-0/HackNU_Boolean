import {Request} from '../models/Request.js';

export async function getAllRequests(req, res) {
    try {
        const requests = await Request.find()
        res.status(200).json({data: requests});
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error getting requests' });
    }
}
export async function getRequestById(req, res) {
    try {
        const requestId = req.params;
        const request = await Request.findById(requestId);
        res.status(200).json({ data: request});
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error getting operators' });
    }
}

export async function createRequest(req, res) {
    try {
        const { name, description, client, group, operator } = req.body;
        const candidate = await Request.findOne({ name });
        if (candidate) {
            return res.status(400).json({ message: 'Request already exists' });
        }
        const request = new Request({ name, description, client, group, operator, status: 'Waiting'});
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
        res.status(200).json({ data: requests});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getAllClosedRequests(req, res) {
    try {
        const requests = await Request.find({ status: 'Closed' })
        res.status(200).json({data: requests});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getAllNotStartedRequests(req, res) {
    try {
        const requests = await Request.find({ status: 'Waiting' })
        res.status(200).json({ data: requests});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getAllClosedOperatorRequests(req, res) {
    try {
        const { operatorId } = req.params;
        const requests = await Request.find({ status: 'Closed', operator: operatorId })
        res.status(200).json({data: requests});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getAllActiveOperatorRequests(req, res) {
    try {
        const { operatorId } = req.params;
        const requests = await Request.find({ status: 'In progress', operator: operatorId })
        res.status(200).json({data: requests});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function assignRequestToOperator(req, res) {
    try {
        const { requestId, operatorId } = req.params;

        // Use findOne instead of find and use an object for the query
        const request = await Request.findById(requestId);

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        request.operator = operatorId;
        request.status = 'In progress';

        const updatedRequest = await request.save();
        res.status(200).json({ data: updatedRequest });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function closeRequestById(req,res) {
    try {
        const { requestId } = req.params;
        const request = await Request.findByIdAndUpdate(
            requestId,
            { status: 'Closed' }
        );
        res.status(200).json({data: request});
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
        if (request.status === 'Closed') {
            request.status = 'In progress';
            await request.save();
            return res.status(200).json({data: request});
        } else if (request.status === 'In progress') {
            return res.status(400).json({ message: 'Request already in progress' });
        } else {
            return res.status(400).json({ message: 'Invalid request status' });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error updating request' });
    }
}

// 14) Operator redirects request to brigade
export async function operatorRedirectRequestToBrigade(req, res) {
    try {
        const { requestId, brigadeId } = req.body;
        const request = await Request.findByIdAndUpdate(
            requestId,
            { group: brigadeId },
            { new: true }
        );
        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// 18) The brigade accepts the request and transfers its status to "In progress"
export async function brigadeAcceptRequest(req, res) {
    try {
        const requestId = req.params;
        const request = await Request.findByIdAndUpdate(
            requestId,
            { status: 'In progress' },
            { new: true }
        );
        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// 19) The team marks the request as completed
export async function teamMarkRequestAsCompleted(req, res) {
    try {
        const requestId = req.params;
        const request = await Request.findByIdAndUpdate(
            requestId,
            { groupCompleted: true },
            { new: true }
        );
        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// 21) The operator marks the request as completed
export async function operatorMarkRequestAsCompleted(req, res) {
    try {
        const requestId = req.params;
        const request = await Request.findById(requestId);

        if (!request.clientCompleted || !request.groupCompleted) {
            return res.status(400).json({ message: 'The client and team must mark the request as completed first' });
        }

        const updatedRequest = await Request.findByIdAndUpdate(
            requestId,
            { status: 'Closed' },
            { new: true }
        );
        res.status(200).json(updatedRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}