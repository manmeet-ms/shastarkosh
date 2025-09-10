import mongoose from "mongoose";

const resourceMaterialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 150 },
    mainImage: { type: String },
    images: [{ type: String }],
    description: { type: String, required: true, maxlength: 6000 },
    isEdited:{type:Boolean, default:false},

    origin: {
      region: String,
      culture: String,
      timePeriod: String,
      yearEstimated: Number,
    },

    sources: [
      {
        title: String,
        author: String,
        link: String,
        publication: String,
        year: Number,
      },
    ],

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
          category: { type: String}, // intruduce enums
 tags: [{ type: String }],

    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },

    reported: { type: Boolean, default: false },
    reportReasons: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        reason: String,
        createdAt: Date,
      },
    ],
  },
  { timestamps: true }
);

resourceMaterialSchema.index({ tags: 1, "origin.region": 1 });

export default mongoose.model("ResourceMaterial", resourceMaterialSchema);
