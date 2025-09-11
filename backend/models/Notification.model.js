import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["like", "reply", "mention", "report", "moderation"],
      required: true,
    },
    message: { type: String, required: true },
    link: { type: String }, // e.g., "/post/123#comment-456"
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// notificationSchema.index({ user: 1, read: 1 });
export default mongoose.model("Notification", notificationSchema);