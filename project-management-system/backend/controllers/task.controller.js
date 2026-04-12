// controllers/task.controller.js

import Task from "../models/Task.js";
import User from "../models/User.js";
import Project from "../models/Project.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, assignedTo, project } = req.body;

  
    const projectData = await Project.findById(project);
    if (!projectData || projectData.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Invalid project" });
    }

   
    const user = await User.findById(assignedTo);

    if (!user || user.role !== "Developer") {
      return res.status(400).json({ msg: "Assign only to developers" });
    }

    if (user.status === "Disabled") {
      return res.status(400).json({ msg: "User is disabled" });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      project,
      createdBy: req.user.id
    });

    res.json(task);

  } catch (err) {
    res.status(500).json({ msg: "Error creating task" });
  }
};

export const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id });
    res.json(tasks);
  } catch {
    res.status(500).json({ msg: "Error fetching tasks" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["To Do", "In Progress", "Done"].includes(status)) {
      return res.status(400).json({ msg: "Invalid status" });
    }

    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: "Task not found" });


    if (task.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    task.status = status;
    await task.save();

    res.json(task);

  } catch {
    res.status(500).json({ msg: "Error updating task" });
  }
};
export const getDevelopers = async (req, res) => {
  try {
    const devs = await User.find({
      role: "Developer",
      status: "Active"
    }).select("_id name email");

    res.json(devs);
  } catch {
    res.status(500).json({ msg: "Error fetching developers" });
  }
};