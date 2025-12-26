import jwt from "jsonwebtoken";
import User from "../models/User.js";

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.json({
        _id: user._id,
        username: user.username,
        token: token,
      });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Seed admin user (for development/initial setup)
// @route   POST /api/auth/seed
// @access  Public
export const seedAdmin = async (req, res) => {
  try {
    const userExists = await User.findOne({ username: "admin" });

    if (userExists) {
      return res.status(400).json({ message: "Admin user already exists" });
    }

    const user = await User.create({
      username: "admin",
      password: "admin123", // This will be hashed by the pre-save hook
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        message: "Admin user created successfully",
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
