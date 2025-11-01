import express from "express";

import { createShastar, deleteShastar, getShastar, getSingleShastar, likeShastar, updateShastar } from "../controllers/shastarInfo.controller.js";
import { authenticateJWT, isAdmin } from "../middlewares/auth.middleware.js";
import { cacheMiddleware } from "../middlewares/cache.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/like/:sId", authenticateJWT, likeShastar);
// router.post("/dislike/:rId", downvotePost)

router.post(
  "/create",
  authenticateJWT,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  createShastar
);
router.put("/update/:sId", authenticateJWT, updateShastar);
router.delete("/delete/:sId", authenticateJWT, isAdmin, deleteShastar); // only dmin should delete it , maybe send an email to admin for deletion request
router.get("/s/:sId", cacheMiddleware("single_shastar", 24 * 60 * 60 * 1000), getSingleShastar);
router.get("/", cacheMiddleware("shastars", 24 * 60 * 60 * 1000), getShastar);

export default router;
