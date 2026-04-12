
import express from "express";
import { login } from "../controllers/auth.controller.js";
import { loginValidator } from "../utils/validators.js";
import { forgotPassword, resetPassword } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/login", loginValidator, login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
export default router;