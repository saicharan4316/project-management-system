
import express from "express";
import {
  getProjects,
  createProject
} from "../controllers/project.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect(["Manager"]), getProjects);


router.post("/", protect(["Manager"]), createProject);

export default router;