import logger from "../../src/utils/logger.utils.js";
import ResourceMaterial from "../models/ResourceMaterial.model.js";

export async function getResourceMaterial(req, res) {
  try {
    let limit = 20; // from query string
    const totalResourceMaterial=await ResourceMaterial.countDocuments()
    if (req.query.limit && req.query.limit<=totalResourceMaterial) {
      limit = parseInt(req.query.limit); // from query string

    }

    // logger("log", limit, req.body);
    const result = await ResourceMaterial.find().sort({ createdAt: -1 }).limit(limit);
    console.log("Total ResourceMaterials", result.length);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });

    logger("error", err.message);
  }
}
export async function getSingleResourceMaterial(req, res) {
  try {
    const { rId } = req.params;
    const result = await ResourceMaterial.findById(rId);
    // console.log("ResourceMaterial Info", result);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });

    logger("error", err.message);
  }
}
export async function createResourceMaterial(req, res) {
  try {
    const { data } = req.body;
    logger("log","data createResourceMaterial",data, req.body,req.params);
    
    const result = await ResourceMaterial.create(req.body);
    res.status(200).json({ result: result});
  } catch (err) {
    res.status(400).json({ error: err });
    logger("error", err.message);
  }
}
export async function updateResourceMaterial(req, res) {
  try {
    const result = await ResourceMaterial.findAnd;
    res.status(200).json({ result: result });
  } catch (err) {
    res.status(500).json({ error: err });

    logger("error", err.message);
  }
}
export async function deleteResourceMaterial(req, res) {
  try {
    const result = await ResourceMaterial;
    res.status(200).json({ result: result });
  } catch (err) {
    res.status(500).json({ error: err });

    logger("error", err.message);
  }
}
