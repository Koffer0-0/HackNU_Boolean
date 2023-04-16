import jwt from 'jsonwebtoken';
import config from 'config';
import {Client} from "../models/Client.js";
import {Operator} from "../models/Operator.js";
import {Specialist} from "../models/Specialist.js";

export const decodeToken = async (token) => {
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        let user;
        if (decoded.role === 'client') {
            user = await Client.findById(decoded.id);
        } else if (decoded.role === 'operator') {
            user = await Operator.findById(decoded.id);
        } else if (decoded.role === 'specialist') {
            user = await Specialist.findById(decoded.id);
        }

        if (!user) {
            return null;
        }

        return { user, role: decoded.role };
    } catch (e) {
        return null;
    }
};