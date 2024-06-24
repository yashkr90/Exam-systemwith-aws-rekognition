import { Department } from "../models/model.js";

export const getDept = async(req, res) => {
    const department = await Department.find({});
    if (department) {
        res.status(200).json(department);       
    } else {
        res.status(200).json({ msg: 'No Data' });
    }
}