import logger from "../../src/utils/logger.utils.js";
import ForumPost from "../models/ForumPost.model.js";
 
export async function getForumPost(req, res) {
  try {
    let limit = 20; // from query string
    const totalPosts=await ForumPost.countDocuments()
    if (req.query.limit && req.query.limit<=totalPosts) {
      limit = parseInt(req.query.limit); // from query string

    }

    logger("log", limit, req.body);
    const result = await ForumPost.find().sort({ createdAt: -1 }).limit(limit);
    console.log("Total Posts", result.length);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });

    logger("error", err.message);
  }
}
export async function getSingleForumPost(req, res) {
  try {
    const { pId } = req.params;
    const result = await ForumPost.findById(sId);
    console.log("Forum Post", result);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });

    logger("error", err.message);
  }
}
export async function createForumPost(req, res) {
  try {
    const { data } = req.body;
    const result = await ForumPost.create(data);
    res.status(200).json({ result: result });
  } catch (err) {
    res.status(500).json({ error: err });

    logger("error", err.message);
  }
}
export async function updateForumPost(req, res) {
  try {
    const result = await ForumPost.findAnd;
    res.status(200).json({ result: result });
  } catch (err) {
    res.status(500).json({ error: err });

    logger("error", err.message);
  }
}
export async function deleteForumPost(req, res) {
  try {
    const result = await ShastarInfo;
    res.status(200).json({ result: result });
  } catch (err) {
    res.status(500).json({ error: err });

    logger("error", err.message);
  }
}
