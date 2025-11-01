import logger from "../../src/utils/logger.utils.js";
import ShastarInfo from "../models/ShastarInfo.model.js";
import { uploadImage } from "../../src/utils/upload.utils.js"; // Cloudinary helper
import { awardPoints } from "../utils/points.utils.js";

export async function getShastar(req, res, next) {
  try {
    let limit = 20; // from query string
    const totalShastar = await ShastarInfo.countDocuments()
    if (req.query.limit && req.query.limit <= totalShastar) {
      limit = parseInt(req.query.limit); // from query string

    }

    const result = await ShastarInfo.find().sort({ createdAt: -1 }).limit(limit);

    res.status(200).json({ success: true, message: "Shastars fetched", data: result });
  } catch (err) {
    logger("error", err.message);
    next(err);
  }
}

export async function getSingleShastar(req, res, next) {
  try {
    const { sId } = req.params;
    const result = await ShastarInfo.findById(sId);
    if (!result) return next({ status: 404, message: "Shastar not found" });

    res.status(200).json({ success: true, message: "Shastar fetched", data: result });
  } catch (err) {
    logger("error", err.message);
    next(err);
  }
}

export const createShastar = async (req, res, next) => {
  const userId = req.user?.id;

  if (!userId) return next({ status: 401, message: "Unauthorized" });

  // Validate: mainImage required
  if (!req.files || !req.files.mainImage) {
    return next({ status: 400, message: "Main image is required" });
  }

  try {
    // Parse JSON fields
    const {
      title,
      alternativeNames,
      description,
      type,
      subType,
      material,
      weight,
      length,
      usage,
      region,
      culture,
      timePeriod,
      category,
      tags,
      sourceTitle,
      sourceAuthor,
      sourceLink,
      sourcePublication,
    } = req.body;

    // Upload main image
    const mainImageRes = await uploadImage(req.files.mainImage[0].buffer, "shastar/main");

    // Upload gallery images (optional)
    let galleryImages = [];
    if (req.files.images) {
      galleryImages = await Promise.all(
        req.files.images.map(async (file) => {
          const result = await uploadImage(file.buffer, "shastar/gallery");
          return { url: result.url };
        })
      );
    }

    // Create sources array
    const sources = [];
    if (sourceTitle) {
      sources.push({
        title: sourceTitle,
        author: sourceAuthor || "",
        link: sourceLink || "",
        publication: sourcePublication || "",
      });
    }

    // Save to DB
    const shastar = await ShastarInfo.create({
      title,
      alternativeNames: alternativeNames?.split(",").map(n => n.trim()).filter(Boolean),
      description,
      type,
      subType,
      material: material ? material.split(",").map(m => m.trim()) : [],
      weight,
      length,
      usage: usage?.split(",").map(u => u.trim()).filter(Boolean),
      origin: {
        region: region || "",
        culture: culture || "",
        timePeriod: timePeriod || "",
      },
      category,
      tags: tags?.split(",").map(t => t.trim()).filter(Boolean),
      sources,
      createdBy: userId,
      mainImage: mainImageRes.url,
      images: galleryImages,
    });

    try { await awardPoints(userId, "CREATE_SHASTAR", { link: `/app/shastars/s/${shastar._id}` }); } catch {}
    res.status(201).json({ success: true, message: "Shastar created successfully", data: shastar });
  } catch (err) {
    logger("error", err.message);
    next(err);
  }
};

export async function updateShastar(req, res, next) {
  try {
    const result = await ShastarInfo.findOneAndUpdate(req.params.sId);
    res.status(200).json({ success: true, message: "Shastar updated", data: result });
  } catch (err) {
    logger("error", err.message);
    next(err);
  }
}

export async function deleteShastar(req, res, next) {
  try { 
    const result = await ShastarInfo.findByIdAndDelete(req.params.sId);
    res.status(200).json({ success: true, message: "Shastar deleted", data: result });
  } catch (err) {
    logger("error", err.message);
    next(err);
  }
}

export async function likeShastar(req, res, next) {
  const { sId } = req.params;
  const userId = req.user?.id;
  if (!userId) return next({ status: 401, message: "Unauthorized" });
  try {
    const doc = await ShastarInfo.findById(sId);
    if (!doc) return next({ status: 404, message: "Shastar not found" });
    const idx = doc.likedBy.findIndex((u) => String(u) === String(userId));
    let liked;
    if (idx >= 0) {
      doc.likedBy.splice(idx, 1);
      doc.likes = Math.max(0, (doc.likes || 0) - 1);
      liked = false;
      try { await awardPoints(userId, "UNLIKE_CONTENT", { link: `/app/shastars/s/${doc._id}` }); } catch {}
    } else {
      doc.likedBy.push(userId);
      doc.likes = (doc.likes || 0) + 1;
      liked = true;
      try { await awardPoints(userId, "LIKE_CONTENT", { link: `/app/shastars/s/${doc._id}` }); } catch {}
    }
    await doc.save();
    res.status(200).json({ success: true, message: liked ? "Liked" : "Unliked", data: { likes: doc.likes, liked } });
  } catch (err) {
    next(err);
  }
}