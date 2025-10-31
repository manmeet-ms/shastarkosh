import mongoose from "mongoose";

const shastarInfoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 150 },
    alternativeNames: [{ type: String, trim: true }],
    mainImage: { type: String, required: true },
    images: { type: Array}, // URLs (from Cloudinary/S3)
    isEdited:{type:Boolean, default:false},

    description: { type: String, required: true, maxlength: 6000 },

    type: {
      type: String,
      enum: ["weapon", "tool", "armor", "manuscript", "artifact"],
      required: true,
    },
    subType: { type: String }, // e.g., 'sword', 'herbal scroll'

    material: { type: Array}, // "Iron, wood"
    weight: { type: String }, // e.g., "1.5 kg"
    length: { type: String }, // e.g., "90 cm"
    usage: [{ type: String }], // e.g., ["melee", "ritual"]
    // e.g., ["melee", "ranged", "ritual", "healing"]
    // 🔹 Historical Metadata
    origin: {
      region: String, // e.g., "Indian Subcontinent", "Medieval Europe"
      culture: String, // e.g., "Vedic", "Persian", "Viking"
      timePeriod: String, // e.g., "8th–12th Century CE"
      yearEstimated: Number, // approximate year
    },
    sources: [
      {
        title: String,
        author: String,
        link: String,
        publication: String, // e.g., "Journal of Medieval Arms"
        year: Number,
      },
    ],
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    reported: { type: Boolean, default: false },
    reportReasons: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        reason: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],

       category: { type: Array}, // intruduce enums

    tags: [{ type: String, trim: true }], // e.g., ["bladed", "Ayurveda", "warfare", "manuscript"]
  },
  { timestamps: true }
);
shastarInfoSchema.index({ type: 1, subType: 1 });
shastarInfoSchema.index({ "origin.region": 1, "origin.culture": 1 });
shastarInfoSchema.index({ tags: 1 });
shastarInfoSchema.index({ createdBy: 1 });
export default mongoose.model("Shastar", shastarInfoSchema);
