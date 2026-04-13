import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import User from "../models/User.js";
import Project from "../models/Project.js";
import Task from "../models/Task.js";

dotenv.config({ path: "../.env" });

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await User.deleteMany();
    await Project.deleteMany();
    await Task.deleteMany();

   const password = await bcrypt.hash("Test@123", 10);

const users = await User.insertMany([
  {
    name: "Rahul Sharma",
    email: "rahul.sharma@taskapp.dev",
    password,
    role: "Admin",
    status: "Active"
  },
  {
    name: "Sneha Rao",
    email: "sneha.rao@pm.dev",
    password,
    role: "Manager",
    status: "Active"
  },
  {
    name: "Priya Mehta",
    email: "priya.mehta@taskapp.dev",
    password,
    role: "Developer",
    status: "Active"
  },
  {
    name: "Arjun Nair",
    email: "arjun.nair@taskapp.dev",
    password,
    role: "Developer",
    status: "Active"
  },
  {
    name: "Rohan Das",
    email: "rohan.das@taskapp.dev",
    password,
    role: "Developer",
    status: "Disabled"
  }
]);
    const manager = users.find(u => u.role === "Manager");
    const devs = users.filter(u => u.role === "Developer");


    const projects = await Project.insertMany([
      { title: "Project Alpha", manager: manager._id },
      { title: "Project Beta", manager: manager._id }
    ]);

    await Task.insertMany([
      {
        title: "Setup backend",
        description: "Initialize Express server",
        project: projects[0]._id,
        assignedTo: devs[0]._id,
        status: "To Do"
      },
      {
        title: "Build UI",
        description: "Create React components",
        project: projects[0]._id,
        assignedTo: devs[1]._id,
        status: "In Progress"
      },
      {
        title: "Fix bugs",
        description: "Resolve login issues",
        project: projects[1]._id,
        assignedTo: devs[2]._id,
        status: "To Do"
      },
      {
        title: "API integration",
        description: "Connect frontend with backend",
        project: projects[1]._id,
        assignedTo: devs[0]._id,
        status: "Done"
      },
      {
        title: "Testing",
        description: "Write test cases",
        project: projects[0]._id,
        assignedTo: devs[1]._id,
        status: "To Do"
      }
    ]);

    console.log(" Seed data inserted");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();