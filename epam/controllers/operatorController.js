import {Operator} from "../models/Operator.js";
export async function getAllOperators(req, res) {
    try {
        const operators = await Operator.find();
        res.status(200).json({ data: operators});
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error getting operators' });
    }
}
