import bcrypt from "bcrypt";
import { User } from "../models/model.js";

export const signInPhase1 = async (req, res) => {
  const { email, password, department } = req.body;
  const user = await User.findOne({ email });
  console.log(user);
  try {
    if (!user || !(user.dept == department) || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        status: false,
        errors: {
            message: "The credentials you provided are invalid.",
            code: "INVALID_CREDENTIALS",
          },

      });
    }
    res.status(201).json({
      status: true,
      content: {
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};
