
import express from "express";
import {
  createTask,
  getMyTasks,
  updateTask,
  getDevelopers
} from "../controllers/task.controller.js";
import Task from "../models/Task.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();


router.post("/", protect(["Manager"]), createTask);
router.get("/developers", protect(["Manager"]), getDevelopers);


router.get("/project/:id", protect(["Manager"]), async (req, res) => {
  const tasks = await Task.find({ project: req.params.id })
    .populate("assignedTo", "name");

  res.json(tasks);
});

router.get("/my", protect(["Developer"]), getMyTasks);
router.put("/:id", protect(["Developer"]), updateTask);

export default router;