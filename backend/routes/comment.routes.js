import express from "express";

import { getCommentCount, getCommentsOnSinglePost, postComment } from "../controllers/comments.controller.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import { cacheMiddleware } from "../middlewares/cache.middleware.js";

const router = express.Router();
router.post("/:postId", authenticateJWT, postComment);
router.get("/count", cacheMiddleware("comment_count", 7 * 24 * 60 * 60 * 1000), getCommentCount);
router.get("/c/:postId", cacheMiddleware("comments_on_single_post", 7 * 24 * 60 * 60 * 1000), getCommentsOnSinglePost);
export default router;
