
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await User.deleteMany();

const hash = await bcrypt.hash("Test@123", 10);

await User.insertMany([
  {
    name: "Rahul Sharma",
    email: "rahul.sharma@taskapp.dev",
    password: hash,
    role: "Admin"
  },
  {
    name: "Sneha Rao",
    email: "sneha.rao@pm.dev",
    password: hash,
    role: "Manager"
  },
  {
    name: "Priya Mehta",
    email: "priya.mehta@taskapp.dev",
    password: hash,
    role: "Developer"
  }
]);

console.log("Seeded securely");
process.exit();