import axios from "axios";
import dayjs from "dayjs";

import logger from "../../src/utils/logger.utils.js";
import User from "../models/User.model.js";

export const getUser = async (req, res) => {
  try {
    const { uid } = req.params;
    logger("log", req.params,uid);
    const userRes = await User.findById(uid);
    logger("success", "User found", userRes.name);

    res.status(200).json(userRes);
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
