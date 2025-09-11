import bcrypt from "bcryptjs";
import crypto from "crypto";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import SparkMD5 from "spark-md5";

import logger from "../../src/utils/logger.utils.js";
import User from "../models/User.model.js";

export const registerUser = async (req, res) => {
  const { username, name, email, password, bio } = req.body;
  // TODO  cemail check later, encrypt password before push
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const hashedAvatar = await SparkMD5.hash(username);
    const createdUser = User.create({ username, name, email, password, bio, avatar: `https://www.gravatar.com/avatar/${hashedAvatar}?d=identicon` });
    const token = crypto.randomBytes(32).toString("hex");
    createdUser.verificationToken = token;
    await createdUser.save();
    logger("log", {
      text: `Click to verify: 
      ${process.env.VITE_BACKEND_URL}/user/verify/${genToken}`,
    });
    res.status(200).json(createdUser.name, "registered successfully, verify your email.");
  } catch (err) {
    res.status(400).json(err.message);
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const user = await User.findOne({ email });
    if (user) {
      logger("log", "User found", user.email, user.name);
      const token = jwt.sign({ id: user._id, name: user.name, role: user.role, avatar: user.avatar, bio: user.bio, isVerified: user.isVerified }, process.env.JWT_SECRET, { expiresIn: "7d" });
      // TODO we are giving away user id in jwt is this a posing a security risk
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none", // or "strict"
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.json({ user });
      res.redirect(process.env.FRONTEND_URL);
    }

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    logger("error", error);
    res.status(401).json(error);
  }
}; 
export const logoutUser = (req, res) => {
  try {
    // logger("log", req.cookies);
    const responseOutcome = res.clearCookie("token", { path: "/", httpOnly: true, secure: true, sameSite: "none" });
    console.log("Logout Successful");
    res.status(200).json({message:"Logout successful"});
    // req.session.destroy();
    // console.log(token);
  } catch (err) {
    res.status(400).json({ error: err, message: "Logout failed" });
  }
};
export const verifyUser = async (req, res) => {
  const { token } = req.params;
  const userRes = await User.findOne({ verificationToken: token });
  if (userRes) {
    userRes.isVerified = true;

    userRes.verificationToken = undefined;
    await userRes.save();
    res.status(200).json({ message: `${userRes.name} verified!` });
  }
};
export const resetPasswordUser = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);

    const userExist = await User.findOne({ email: email });
    if (userExist) {
      const resetToken = crypto.randomBytes(32).toString("hex");
      userExist.resetPasswordToken = resetToken;
      // TODO add reset passwork mailer link and make aveifier funtin to do the sasme verification
      userExist.resetPasswordTokenExpires = dayjs().add(10, "m");
      await userExist.save();

      res.status(200).json("");
    } else {
      res.status(400).json("User does not exists!");
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};
export const resetPasswordTokenVerify = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);

    const userExist = await User.findOne({ email: email });
    if (userExist) {
      const resetToken = crypto.randomBytes(32).toString("hex");
      userExist.resetPasswordToken = resetToken;
      userExist.resetPasswordTokenExpires = dayjs().add(10, "m");
      await userExist.save();

      res.status(200).json("");
    } else {
      res.status(400).json("User does not exists!");
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};
