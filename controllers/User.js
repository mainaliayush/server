import bcrypt from "bcryptjs";
import User from "../models/User.js";
// import dotenv from 'dotenv';

export const Login = async (req, res) => {
  console.log(req.body)
  const { username, password } = req.body;
  try {
    const oldUser = await User.findOne({ username });
    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect) return res.status(200).json({ message: "Invalid username or password! "});
    res.status(200).json({ result: oldUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const Register = async (req, res) => {
  console.log("LL", req.body)
  const { fname, lname, username, password, confirmPassword } = req.body;
  try {
    const oldUser = await User.findOne({ username });
    if (oldUser) return res.status(400).json({ message: "User already exists!" });
    if (password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match." });
    const hashedPassword = await bcrypt.hash(password, 12);  // Hashing the password.
    const result = await User.create({ username, password: hashedPassword, fname:fname, lname:lname});
    res.status(201).json({ result});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 
