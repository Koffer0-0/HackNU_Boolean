import {Client} from "../models/Client.js";
import {Operator} from "../models/Operator.js";
import {Specialist} from "../models/Specialist.js";

export const findUserByEmail = async (email) => {
    let user = await Client.findOne({ email });
    if (user) {
        return { user, role: 'client' };
    }

    user = await Operator.findOne({ email });
    if (user) {
        return { user, role: 'operator' };
    }

    user = await Specialist.findOne({ email });
    if (user) {
        return { user, role: 'specialist' };
    }

    return null;
};