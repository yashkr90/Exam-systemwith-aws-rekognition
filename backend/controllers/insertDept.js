import { Department } from "../models/model.js";

export const insertDept = async (req, res) => {
  try {
    const { name } = req.body;
    const department = new Department({
      DepartmentName: name,
    });
    await department.save();
    res.status(201).json({ message: "Department created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};