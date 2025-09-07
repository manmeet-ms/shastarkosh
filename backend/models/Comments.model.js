import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: String,
    author: {
      name: { type: String },
      username: { type: String },
      avatar: { type: String },
    },
    // author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    discussionId: { type: mongoose.Schema.Types.ObjectId },
    parentComment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" }, // for nesting
    upvotes: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
