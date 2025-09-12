import logger from "../../src/utils/logger.utils.js";
import ShastarInfo from "../models/ShastarInfo.model.js";

export async function getShastar(req, res) {
  try {
    let limit = 20; // from query string
    const totalShastar=await ShastarInfo.countDocuments()
    if (req.query.limit && req.query.limit<=totalShastar) {
      limit = parseInt(req.query.limit); // from query string

    }

    // logger("log", limit, req.body);
    const result = await ShastarInfo.find().sort({ createdAt: -1 }).limit(limit);
    // logger("log","Total shastars", result.length);

    res.status(200).json(result);
  } catch (err) {
    logger("error", err.message);
    res.status(500).json({ error: err.message });
  }
}
export async function getSingleShastar(req, res) {
  try {
    const { sId } = req.params;
    const result = await ShastarInfo.findById(sId);
    // console.log("Shastar Info", result);

    res.status(200).json(result);
  } catch (err) {
    logger("error", err.message);
    res.status(500).json({ error: err.message });
  }
}
export async function createShastar(req, res) {
  try {
    const { data } = req.body;
    logger("log","data createShastar",data, req.body,req.params);
    
    const result = await ShastarInfo.create(req.body);
    res.status(200).json({ result: result});
  } catch (err) {
    logger("error", err.message);
    res.status(400).json({ error: err.message });
  }
}
export async function updateShastar(req, res) {
  try {
    const result = await ShastarInfo.findOneAndUpdate(req.params.sId);
    res.status(200).json({ result: result });
  } catch (err) {
    logger("error", err.message);
    res.status(500).json({ error: err.message });
  }
}
export async function deleteShastar(req, res) {
  try { 
    const result = await ShastarInfo;
    res.status(200).json({ result: result });
  } catch (err) {
    logger("error", err.message);
    res.status(500).json({ error: err.message });
  }
}

export async function likeShastar(req, res) {
  
    const { sId } = req.params;
    logger("info",sId)
    try {
      const resPost = await ShastarInfo.findByIdAndUpdate(sId);
      resPost.likes += 1;
      await resPost.save();
      res.status(200).json("upvote Successful");
    } catch (err) {
      res.status(500).json(err.message);
    }
   
}