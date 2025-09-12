import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true, maxlength: 2000 },
    // author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // whe teh app wil grow this may get blaoted also the stale data issue, that the later scalability part
    author: {
      name: { type: String, required: true },
      username: { type: String },
      avatar: { type: String },
    },
    isEdited: { type: Boolean, default: false },
    discussionId: { type: mongoose.Schema.Types.ObjectId, required: true, 
      // refPath: "discussionType" 
    },

    discussionType: {
      type: String,
      required: true,
      enum: ["ForumPost", "ShastarInfo", "ResourceMaterial"],
    },

    // For threading
    parentComment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },

    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    isReported: { type: Boolean, default: false },
    status: { type: String, enum: ["active", "edited", "deleted"], default: "active" },
  },
  { timestamps: true }
); 

commentSchema.index({ targetType: 1, targetId: 1 });
commentSchema.index({ parentComment: 1 });
commentSchema.index({ author: 1 });
commentSchema.index({ createdAt: -1 });

export default mongoose.model("Comment", commentSchema);
