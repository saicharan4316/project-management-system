
import express from "express";
import ActivityLog from "../models/ActivityLog.js";
import { protect } from "../middleware/auth.middleware.js";
import Project from "../models/Project.js";
import Task from "../models/Task.js";
const router = express.Router();

router.get("/", protect(["Admin", "Manager"]), async (req, res) => {
  try {
    const { user, action, startDate, endDate } = req.query;

    let filter = {};


    if (req.user.role === "Admin") {
      if (user) filter.user = user;
      if (action) filter.action = action;
    }


    if (req.user.role === "Manager") {

      const projects = await Project.find({ createdBy: req.user.id });
      const projectIds = projects.map(p => p._id);

      const tasks = await Task.find({ project: { $in: projectIds } });
      const taskIds = tasks.map(t => t._id);

      filter.$or = [
        { entity: "Project", entityId: { $in: projectIds } },
        { entity: "Task", entityId: { $in: taskIds } }
      ];

      if (action) filter.action = action;
      if (user) filter.user = user;
    }

    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const logs = await ActivityLog.find(filter)
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(logs);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching logs" });
  }
});

export default router;