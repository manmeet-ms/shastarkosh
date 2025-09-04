import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: String,
    author: { type: ObjectId, ref: "User" },
    post: { type: ObjectId, ref: "Post" },
    parentComment: { type: ObjectId, ref: "Comment" }, // for nesting
    upvotes: Number,
   
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
