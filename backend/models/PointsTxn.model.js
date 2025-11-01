import mongoose from "mongoose";

const pointsTxnSchema = new mongoose.Schema(
  {
    uid: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    user: { type: String, required: true },
    type: { type: String, required: true },
    points: { type: Number, required: true },
    balanceAfter: { type: Number, required: true },
    meta: { type: Object },
  },
  { timestamps: true }
);

export default mongoose.model("PointsTxn", pointsTxnSchema);
