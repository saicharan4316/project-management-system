import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    role: {
      type: String,
      enum: ["Admin", "Manager", "Developer"],
      required: true
    },
    status: {
      type: String,
      enum: ["Active", "Disabled"],
      default: "Active"
    },
    resetToken: {
      type: String
    },
    resetTokenExpiry: {
      type: Date
    }
  },
  { timestamps: true },

);

export default mongoose.model("User", userSchema);