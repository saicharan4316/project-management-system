// controllers/user.controller.js
import User from "../models/User.js";
import bcrypt from 'bcryptjs';
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch {
    res.status(500).json({ msg: "Error fetching users" });
  }
};

export const toggleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    user.status = user.status === "Active" ? "Disabled" : "Active";
    await user.save();

    res.json({ msg: "Updated", status: user.status });

  } catch {
    res.status(500).json({ msg: "Error updating user" });
  }
};
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

   
    if (!name || !email || !password || !role) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: "Email already exists" });
    }

  
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role
    });

    res.status(201).json({
      msg: "User created",
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });

  } catch (err){
    console.log(err)
    res.status(500).json({ msg: "Error creating user" });
  }
};
