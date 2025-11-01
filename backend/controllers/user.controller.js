import logger from "../../src/utils/logger.utils.js";
import Post from "../models/ForumPost.model.js";
import ResourceMaterial from "../models/ResourceMaterial.model.js";
import Shastar from "../models/ShastarInfo.model.js";
import User from "../models/User.model.js";

export const getUser = async (req, res) => {
  try {
    const { uid } = req.params;
    logger("log", req.params, uid);
    const userRes = await User.findById(uid);
    logger("success", "User found", userRes.name);

    res.status(200).json(userRes);
  } catch (error) {
    res.send(error.message);
  }
};
export const getUserContent = async (req, res) => {
  try {
    const { id } = req.user;
    logger("log", id, req.user);
    const userRes = await User.findById(id);
    logger("success", "User found", userRes.name);
    const userPosts = await Post.find({ author: id });
    const userShastars = await Shastar.find({ createdBy: id });
    const userResources = await ResourceMaterial.find({ createdBy: id });
    res.status(200).json({ message: "User Content Found", data: { userRes, userPosts, userShastars, userResources } });
  } catch (error) {
    res.send(error.message);
  }
};
export const updateUserProfile = async (req, res) => {
  //   {
  //   "id": "64f123ab",
  //   "property": "username",
  //   "propertyValue": "newName"
  // }
  try {
    console.log(req.body);

    const currentUser = await User.findByIdAndUpdate(req.user.id, req.body);
    currentUser.save();
    console.log(currentUser.name, currentUser.points);

    res.send("ok");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const flushUsers = async (req, res) => {
  await User.deleteMany({});
  res.status(200).json({ message: "All users flushed successfully" });
};
