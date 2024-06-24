import dotenv from "dotenv";
import { Student } from "../models/model.js";

dotenv.config();

const secretKey = process.env.SECRETKEY;

export const insertStudent = async (req, res) => {
  try {
    const { name, email, dept, imgUrl } = req.body;
    const student = new Student({
      studentName: name,
      studentPassword: email,
      email: email,
      department: dept,
      image: imgUrl
    });
    await student.save();
    res.status(201).json({ message: "Student created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};