import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// hash the password
const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const register = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    if ([email, userName, password].some((field) => field?.trim() === "")) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "User already exists!",
      });
    }

    const hash = await hashPassword(password);

    const user = await User.create({
      userName,
      email,
      password: hash,
    });

    return res.status(201).json({
      success: true,
      message: "User Created successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { register, login, logout };
