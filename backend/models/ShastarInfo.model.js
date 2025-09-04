import mongoose from "mongoose";

const shastarInfoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    alternativeNames: [
      {
        type: String,
        trim: true,
      },
    ],

    // 🔹 Media
    mainImage: {
      type: String, // URL (from Cloudinary/S3)
      required: true,
    },
    images: Array, // URL (from Cloudinary/S3)

    // 🔹 Descriptive Details
    description: {
      type: String,
      required: true,
      maxlength: 5000,
    },
    subType: {
      type: String,
      // e.g., 'sword', 'axe', 'siege engine', 'herbal manuscript'
    },

    material: String, // e.g., ["iron", "wood", "bronze"]
    weight: String, // e.g., "1.5 kg"
    length: String, // e.g., "90 cm"
    usage: String, // e.g., ["melee", "ranged", "ritual", "healing"]
    // 🔹 Historical Metadata
    origin: {
      region: String, // e.g., "Indian Subcontinent", "Medieval Europe"
      culture: String, // e.g., "Vedic", "Persian", "Viking"
      timePeriod: String, // e.g., "8th–12th Century CE"
      yearEstimated: Number, // approximate year
    },

    sources: [
      {
        title: { type: String },
        author: { type: String },
        link: { type: String },
        publication: { type: String }, // e.g., "Journal of Medieval Arms"
        year: { type: Number },
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },

    // 🔹 Discussion System (Nested Comments)
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
        avatar: {
          type: String,
        },
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

    // 🔹 Moderation & Status
    reported: {
      type: Boolean,
      default: false,
    },
    reportReasons: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        reason: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    // 🔹 Category/Tags for Filtering
    categories: [
      {
        type: String,
        ref: "Category",
      },
    ],
    tags: [String], // e.g., ["bladed", "Ayurveda", "warfare", "manuscript"]
  },
  { timestamps: true }
);
shastarInfoSchema.index({ name: "text", description: "text", tags: "text" });
shastarInfoSchema.index({ "origin.region": 1 });
shastarInfoSchema.index({ type: 1, subType: 1 });

export default mongoose.model("ShastarInfo", shastarInfoSchema);
