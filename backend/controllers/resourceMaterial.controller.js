import logger from "../../src/utils/logger.utils.js";
import ResourceMaterial from "../models/ResourceMaterial.model.js";
import { uploadImage, uploadPdf, uploadVideo } from "../../src/utils/upload.utils.js";
import { awardPoints } from "../utils/points.utils.js";

export async function getResourceMaterial(req, res, next) {
  try {
    let limit = 20; // from query string
    const totalResourceMaterial = await ResourceMaterial.countDocuments()
    if (req.query.limit && req.query.limit <= totalResourceMaterial) {
      limit = parseInt(req.query.limit); // from query string
    }

    const result = await ResourceMaterial.find().sort({ createdAt: -1 }).limit(limit);

    res.status(200).json({ success: true, message: "Resources fetched", data: result });
  } catch (err) {
    logger("error", err.message);
    next(err);
  }
}

export async function getSingleResourceMaterial(req, res, next) {
  try {
    const { rId } = req.params;
    const result = await ResourceMaterial.findById(rId);
    if (!result) return next({ status: 404, message: "Resource not found" });

    res.status(200).json({ success: true, message: "Resource fetched", data: result });
  } catch (err) {
    logger("error", err.message);
    next(err);
  }
}

export async function createResourceMaterial(req, res, next) {
  try {
    const userId = req.user?.id;
    if (!userId) return next({ status: 401, message: "Unauthorized" });

    const {
      title,
      description,
      region,
      culture,
      timePeriod,
      yearEstimated,
      category,
      tags,
      sourceTitle,
      sourceAuthor,
      sourceLink,
      sourcePublication,
      sourceYear,
    } = req.body;

    // Upload files
    let mainImageUrl = "";
    if (req.files?.mainImage?.[0]) {
      const up = await uploadImage(req.files.mainImage[0].buffer, "resources/main");
      mainImageUrl = up.url;
    }

    let images = [];
    if (req.files?.images?.length) {
      images = await Promise.all(
        req.files.images.map(async (f) => {
          const r = await uploadImage(f.buffer, "resources/gallery");
          return r.url;
        })
      );
    }

    let videos = [];
    if (req.files?.videos?.length) {
      videos = await Promise.all(
        req.files.videos.map(async (f) => {
          const r = await uploadVideo(f.buffer, "resources/videos");
          return r.url;
        })
      );
    }

    let pdfUrl = "";
    if (req.files?.pdfFile?.[0]) {
      const up = await uploadPdf(req.files.pdfFile[0].buffer, "resources/pdf");
      pdfUrl = up.url;
    }

    const sources = [];
    if (sourceTitle) {
      sources.push({
        title: sourceTitle,
        author: sourceAuthor || "",
        link: sourceLink || "",
        publication: sourcePublication || "",
        year: sourceYear ? Number(sourceYear) : undefined,
      });
    }

    const doc = await ResourceMaterial.create({
      title,
      description,
      origin: { region, culture, timePeriod, yearEstimated: yearEstimated ? Number(yearEstimated) : undefined },
      category,
      tags: tags?.split(",").map((t) => t.trim()).filter(Boolean),
      sources,
      createdBy: userId,
      mainImage: mainImageUrl,
      images,
      pdfFile: pdfUrl,
      videos,
    });

    try { await awardPoints(userId, "CREATE_RESOURCE", { link: `/app/resources/r/${doc._id}` }); } catch (e) {}
    res.status(201).json({ success: true, message: "Resource created", data: doc });
  } catch (err) {
    logger("error", err.message);
    next(err);
  }
}

export async function updateResourceMaterial(req, res, next) {
  try {
    const result = await ResourceMaterial.findByIdAndUpdate(req.params.rId, req.body, { new: true });
    res.status(200).json({ success: true, message: "Resource updated", data: result });
  } catch (err) {
    logger("error", err.message);
    next(err);
  }
}

export async function deleteResourceMaterial(req, res, next) {
  try {
    const result = await ResourceMaterial.findByIdAndDelete(req.params.rId);
    res.status(200).json({ success: true, message: "Resource deleted", data: result });
  } catch (err) {
    logger("error", err.message);
    next(err);
  }
}

export async function likeResourceMaterial(req, res, next) {
  const { rId } = req.params;
  const userId = req.user?.id;
  try {
    const doc = await ResourceMaterial.findById(rId);
    if (!doc) return next({ status: 404, message: "Resource not found" });
    const idx = doc.likedBy.findIndex((u) => String(u) === String(userId));
    let liked;
    if (idx >= 0) {
      doc.likedBy.splice(idx, 1);
      doc.likes = Math.max(0, (doc.likes || 0) - 1);
      liked = false;
      try { await awardPoints(userId, "UNLIKE_CONTENT", { link: `/app/resources/r/${doc._id}` }); } catch (e) {}
    } else {
      doc.likedBy.push(userId);
      doc.likes = (doc.likes || 0) + 1;
      liked = true;
      try { await awardPoints(userId, "LIKE_CONTENT", { link: `/app/resources/r/${doc._id}` }); } catch (e) {}
    }
    await doc.save();
    res.status(200).json({ success: true, message: liked ? "Liked" : "Unliked", data: { likes: doc.likes, liked } });
  } catch (err) {
    next(err);
  }
}