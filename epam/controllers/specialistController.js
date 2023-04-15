import {Specialist} from "../models/Specialist.js";
export async function getAllSpecialists(req, res) {
    try {
        const specialists = await Specialist.find();
        res.status(200).json({data: specialists});
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error getting specialists' });
    }
}
