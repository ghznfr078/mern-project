import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Options
const options = {
  httpOnly: true,
  secure: false,
};

// hash the password
const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

// generate token
const generateToken = (id, role, email) => {
  return jwt.sign({ id, role, email }, process.env.JWT_SECRET, {
    expiresIn: "60m",
  });
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
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = generateToken(user._id, user.role, user.email);

    return res.status(200).cookie("token", token, options).json({
      success: true,
      user,
      message: "User Logged in successfully!",
    });
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
