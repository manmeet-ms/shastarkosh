import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "moderator", "admin", "tester"], default: "user" },
    avatar: { type: String },
    reputationPoints: { type:Number, default:0 },  
    bio: { type: String, maxlength: 500 },  
    isVerified: { type: Boolean, default: false },
    verificationToken: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    // provider: {
    //   discord: {
    //     discordId: { type: String, unique: true },
    //   },
    //   google: {
    //     googleId: { type: String, unique: true },
    //   },
    //   discord: {
    //     discordId: { type: String, unique: true },
    //   },
    // },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.verificationToken) {
    this.verificationToken = null;
  }
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

export default mongoose.model("User", userSchema);
