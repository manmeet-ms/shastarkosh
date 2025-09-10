import express from "express";

import { createForumPost, deleteForumPost, downvotePost, getForumPost, getSingleForumPost, updateForumPost, upvotePost } from "../controllers/forumPost.controller.js";
import {authenticateJWT, isAdmin} from '../middlewares/auth.middleware.js'
import {cacheMiddleware} from '../middlewares/cache.middleware.js'

const router = express.Router();

router.post("/create", authenticateJWT,createForumPost);
router.put("/update/:pId", authenticateJWT,updateForumPost);
router.delete("/delete/:pId", authenticateJWT,isAdmin,deleteForumPost);

router.post("/upvote/:postId", upvotePost);
router.post("/downvote/:postId", downvotePost
);
router.get("/p/:pId", getSingleForumPost);
router.get("/", getForumPost);

export default router;
