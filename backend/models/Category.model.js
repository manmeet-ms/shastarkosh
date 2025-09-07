import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    // slug: String,
  }
  // , { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
