
import express from "express";
import {
  getUsers,
  toggleUser,
  createUser
} from "../controllers/user.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();


router.get("/", protect(["Admin"]), getUsers);


router.post("/", protect(["Admin"]), createUser);

router.put("/:id/toggle", protect(["Admin"]), toggleUser);

export default router;