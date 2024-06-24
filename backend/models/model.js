import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Define User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dept: {
    type: String,
    required: true,
  },
  //   image:{
  //     type: String,
  //     required:true
  //   }
});

// Define Department schema
const departmentSchema = new mongoose.Schema({
  DepartmentName: {
    type: String,
    required: true,
    unique: true,
  },
});

// Define Student schema
const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  studentPassword: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

// Define Exam schema
const examSchema = new mongoose.Schema({
  examName: {
    type: String,
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
});

// Define models based on schemas
const Department = mongoose.model("Department", departmentSchema);
const Student = mongoose.model("Student", studentSchema);
const Exam = mongoose.model("Exam", examSchema);
const User = mongoose.model("User", userSchema);

userSchema.plugin(mongoosePaginate);

// Create MongoDB models based on the schemas

export { User, Department, Student, Exam };
