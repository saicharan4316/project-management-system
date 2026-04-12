import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  status: { type: String, default: "To Do" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" }
});

export default mongoose.model("Task", taskSchema);