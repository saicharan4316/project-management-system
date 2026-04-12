
import express from "express";
import { protect } from "../middleware/auth.middleware.js";

import User from "../models/User.js";
import Project from "../models/Project.js";
import Task from "../models/Task.js";

const router = express.Router();


router.get("/stats", protect(["Admin"]), async (req, res) => {
  try {
    const users = await User.countDocuments();
    const projects = await Project.countDocuments();
    const tasks = await Task.countDocuments();

    res.json({ users, projects, tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching stats" });
  }
});

export default router;