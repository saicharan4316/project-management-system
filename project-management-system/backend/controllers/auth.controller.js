import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import crypto from "crypto";
import nodemailer from "nodemailer";
export const login = async (req, res) => {
  try {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

   
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }


    if (user.status === "Disabled") {
      return res.status(403).json({ msg: "Account disabled" });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: user.role
    });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

   
    const token = crypto.randomBytes(32).toString("hex");

   
    user.resetToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;

    await user.save();

   
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    const link = `http://localhost:5173/reset/${token}`;

    await transporter.sendMail({
      from: '"Project System" <no-reply@test.com>',
      to: user.email,
      subject: "Reset Password",
      html: `<p>Click here to reset password:</p>
             <a href="${link}">${link}</a>`
    });

    res.json({ msg: "Reset email sent" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error sending email" });
  }
};



export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetToken: hashedToken,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

  
    user.password = await bcrypt.hash(password, 10);

    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.json({ msg: "Password reset successful" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error resetting password" });
  }
};