import mongoose from "mongoose";

const forumPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 150 },

    content: { type: String, required: true, maxlength: 6000 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    // category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
       category: { type: String}, // intruduce enums

    tags: [{ type: String, trim: true }],
     
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    viewCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 }, // Denormalized for performance
 
    isPinned: { type: Boolean, default: false },
    status: { type: String, enum: ["active", "deleted", "reported"], default: "active" },
    isEdited:{type:Boolean, default:false},
    reportedReasons: [ 
      { 
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        reason: { type: String, maxlength: 500 },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);
forumPostSchema.index({ category: 1, createdAt: -1 });
forumPostSchema.index({ tags: 1 });
forumPostSchema.index({ status: 1 });
forumPostSchema.index({ author: 1 });
forumPostSchema.index({ title: "text", content: "text", tags: "text" });

export default mongoose.model("ForumPost", forumPostSchema);
