import axios from "axios";
import fs from "fs";
import path from "path";

import logger from "../../src/utils/logger.utils.js";
import HourlyCheckin from "../models/HourlyCheckin.model.js";
import User from "../models/User.model.js";
import dayjs from "dayjs";

export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const userRes = await User.findById(userId);
    // logger("success", "User found", userRes.name);

    res.status(200).json(userRes);
  } catch (error) {
    res.send(error.message);
  }
};

export const logPoints = async (req, res) => {};
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
export const getDiscordUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    logger("log", userId);
    const profileData = await axios.get(`${process.env.VITE_DISCORD_API_ENDPOINT}/users/${userId}`, {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_JATHEDAR_BOT_TOKEN}`,
      },
    });
    res.status(200).json(profileData.data);
  } catch (error) {
    res.send(error.message);
    console.error(error.message);
  }
};

/**
 * POINTS TRANSACTIONS
 */

export const applyPoints = async (req, res) => {
  const eventPoints = {
    TIMEBLOCK_COMPLETE_CREDIT: 20, // ✅
    ALL_DAILY_COMPLETE_CREDIT: 100,
    NEW_STREAK_CREDIT: 50,
    EXTEND_STREAK_CREDIT: 10,
    DIARY_WRITING_CREDIT: 5,
    RITUAL_COMPLETE_CREDIT: 10,
    URGE_LOGGED_CREDIT: 10,
    URGE_RESISTED_CREDIT: 50,
    MOOD_LOGGED_CREDIT: 5,
    MOOD_IMPROVEMENT_CREDIT: 5,
    RITUAL_MISS_PENALTY: -10,
    URGE_FAILURE_PENALTY: -100,
    BLOCK_MISS_PENALTY: -40, // ✅
    STREAK_BREAK_PENALTY: -100,
    VIOLATION_PENALTY: -50,
    TIMER_RESET_PENALTY: -60,
    PUNISHMENT_TRIGGER_PENALTY: -15,
    DEFAULT: 0,
  };

  try {
    // const {userId}=req.user.id
    console.log(req.user.id);
    const eventKey = req.body.event;
    if (!eventPoints.hasOwnProperty(eventKey)) {
      return res.status(400).json({ error: "Invalid event type" });
    }
    const userRes = await User.findById(req.user.id);
    const currentPoints = userRes.points;
    const finalPoints = currentPoints + eventPoints[eventKey];
    const updatedUserPoints = await User.findByIdAndUpdate(
      userRes._id,
      {
        points: finalPoints,
      },
      { new: true }
    );
    updatedUserPoints.save();
    console.log(`User,CurrentPoints,EventKey,EventPoints,FinalPoints
${userRes.name},${currentPoints},${eventKey},${eventPoints[eventKey]},${finalPoints}`);
    await PointsTxn.create({
      uid: userRes._id,
      type: eventKey,
      points: currentPoints,
      balanceAfter: finalPoints,
    });
    res.status(200).json({ points: updatedUserPoints.points });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const TestApplyPoints = async (req, res) => {
  const eventArray = ["TIMEBLOCK_COMPLETE_CREDIT", "ALL_DAILY_COMPLETE_CREDIT", "NEW_STREAK_CREDIT", "EXTEND_STREAK_CREDIT", "DIARY_WRITING_CREDIT", "RITUAL_COMPLETE_CREDIT", "URGE_LOGGED_CREDIT", "URGE_RESISTED_CREDIT", "MOOD_LOGGED_CREDIT", "MOOD_IMPROVEMENT_CREDIT", "RITUAL_MISS_PENALTY", "URGE_FAILURE_PENALTY", "BLOCK_MISS_PENALTY", "STREAK_BREAK_PENALTY", "VIOLATION_PENALTY", "TIMER_RESET_PENALTY", "PUNISHMENT_TRIGGER_PENALTY", "DEFAULT"];

  const eventPoints = {
    TIMEBLOCK_COMPLETE_CREDIT: 20,
    ALL_DAILY_COMPLETE_CREDIT: 100,
    NEW_STREAK_CREDIT: 50,
    VIOLATION_RESOLVED_CREDIT: 30,
    EXTEND_STREAK_CREDIT: 10,
    DIARY_WRITING_CREDIT: 5,
    RITUAL_COMPLETE_CREDIT: 10,
    URGE_LOGGED_CREDIT: 10,
    URGE_RESISTED_CREDIT: 50,
    MOOD_LOGGED_CREDIT: 5,
    MOOD_IMPROVEMENT_CREDIT: 5,
    RITUAL_MISS_PENALTY: -10,
    URGE_FAILURE_PENALTY: -100,
    BLOCK_MISS_PENALTY: -40,
    STREAK_BREAK_PENALTY: -100,
    VIOLATION_PENALTY: -50,
    TIMER_RESET_PENALTY: -60,
    PUNISHMENT_TRIGGER_PENALTY: -15,
    DEFAULT: 0,
  };
  console.log("user,currentPoints,eventKey,eventPoints,finalPoint");

  try {
    const { entryLimit } = req.params;
    const filePath = path.join(process.cwd(), `./backend/logs/${entryLimit}_points_test.csv`);
    const writeStream = fs.createWriteStream(filePath, { flags: "w" });

    // CSV header
    writeStream.write("User,CurrentPoints,EventKey,EventPoints,FinalPoints\n");

    for (let index = 0; index < entryLimit; index++) {
      // const {userId}=req.user.id
      // console.log(req.user.id);
      const eventKey = eventArray[Math.floor(Math.random() * eventArray.length)];

      const userRes = await User.findById(req.user.id);
      const currentPoints = userRes.points;
      const finalPoints = currentPoints + eventPoints[eventKey];
      const uupdatedUserPoints = await User.findByIdAndUpdate(userRes._id, {
        points: finalPoints,
      });
      uupdatedUserPoints.save();
      // console.log("user:", userRes.name, "currentPoints:", currentPoints, "| eventKey:", eventKey, "| eventPoints:", eventPoints[eventKey], "| finalPoint:", finalPoints);
      writeStream.write(`${userRes.name},${currentPoints},${eventKey},${eventPoints[eventKey]},${finalPoints}\n`);
      await PointsTxn.create({
        uid: userRes._id,
        type: eventKey,
        points: currentPoints,
        balanceAfter: finalPoints,
      });
    }
    writeStream.end(); // close file
    logger("info", "loop exit, CSV written");

    res.status(200).json("OK");
  } catch (err) {
    logger("error", err.message);
    res.status(400).json({ error: err.message });
  }
};

export const getPointsLedger = async (req, res) => {
  try {
    const entries = await PointsTxn.find({ uid: req.user.id }).sort();
    const totalEntries = await PointsTxn.countDocuments();
    res.status(200).json({ totalEntries, entries });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getHourlyCheckins = async (req, res) => {
  try {
    const today = dayjs().startOf("day");
    const tomorrow = dayjs(today).add(1, "day");

    const result = await HourlyCheckin.find({
      uid: req.user.id,
      createdAt: { $gte: today.toDate(), $lt: tomorrow.toDate() },
    }).sort({ createdAt: -1 });

    res.status(200).json(result);
  } catch (error) {
    logger("error",error)
    res.status(400).json(error);
  }
};

// Create a new hourly checkin
export const createHourlyCheckin = async (req, res) => {
  let tagsArray = [];
  try {
    const { noteEntry } = req.body;
    logger("log", req.body, noteEntry);

    if (noteEntry.includes("working")) {
      tagsArray.push("working");
    }
    if (noteEntry.includes("code")) {
      tagsArray.push("code");
    }
    if (noteEntry.includes("rest")) {
      tagsArray.push("rest");
    }

    logger("log", noteEntry, tagsArray);
    console.log(req.user.id);

    const entry = await HourlyCheckin.create({
      uid: req.user.id,
      note: noteEntry,
      tags: tagsArray,
    });
    res.status(200).json(entry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
