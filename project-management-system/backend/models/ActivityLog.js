
import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    action: {
      type: String,
      required: true
    },
    entity: {
      type: String
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId
    },
    details: String
  },
  { timestamps: true }
);

export default mongoose.model("ActivityLog", activitySchema);