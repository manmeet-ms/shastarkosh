import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "moderator", "admin"], default: "user" },
    avatar: { type: String },
    bio: { type: String },
    isVerified: { type: Boolean, default: false },
    verificationToken: {
      type: String,
    },
    resetPasswordToken: { type: String },
    resetPasswordTokenExpires: { type: Date },
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
    this.verificationToken = this.verificationToken;
  }
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export default mongoose.model("User", userSchema);
