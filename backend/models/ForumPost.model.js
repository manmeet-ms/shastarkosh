import mongoose from "mongoose";

const forumPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      aId: { type: String },
      name: { type: String, required: true },
      avatar: { type: String, required: true },
    },
    category: { type: String },
    // category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    tags: { type: Array },
    upvotes: { type: Number, default:0 },
    downvotes: { type: Number, default:0 },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
        // avatar: {
        //   type: String,
        // },
        text: {
          type: String,
          required: true,
          maxlength: 1000,
        },
        upvotes: Number,
        replies: [
          {
            user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
            username: String,
            avatar: String,
            text: { type: String, maxlength: 2000 },
            likes: Number,
            createdAt: {
              type: Date,
              default: Date.now,
            },
          },
        ],
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    views: { type: Number, default: 0 },
    isPinned: Boolean,
    status: { type: String, enum: ["active", "deleted", "reported"] },
  },
  { timestamps: true }
);

export default mongoose.model("ForumPost", forumPostSchema);
