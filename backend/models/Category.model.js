import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, maxlength: 500 },
    categoryType: { type: String, enum: ["ShastarInfo", "ResourceMaterial", "ForumPost", "uncategorized"], required: true, default: "uncategorized" },
    slug: {
      type: String,
      // required: true,
      unique: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Category", categorySchema);
