
import ActivityLog from "../models/ActivityLog.js";

export const logActivity = async ({
  user,
  action,
  entity,
  entityId,
  details
}) => {
  try {
    await ActivityLog.create({
      user,
      action,
      entity,
      entityId,
      details
    });
  } catch (err) {
    console.error("Log error:", err.message);
  }
};