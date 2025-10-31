import User from "../models/User.model.js";

export const leaderboardUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ reputation: -1 }).limit(20);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
