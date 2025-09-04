import mongoose from "mongoose";

const forumPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    tags: [String],
    upvotes: { type:Number },
    downvotes: { type:Number },
    comments: { type:Number },
    views: { type: Number, default: 0 },
    isPinned: Boolean,
    status: { type: String, enum: ["active", "deleted", "reported"] },
  },
  { timestamps: true }
);

export default mongoose.model("ForumPost", forumPostSchema);
