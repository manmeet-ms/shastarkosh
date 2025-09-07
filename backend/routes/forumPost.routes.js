import express from "express";

import { createForumPost, deleteForumPost, downvotePost, getForumPost, getSingleForumPost, updateForumPost, upvotePost } from "../controllers/forumPost.controller.js";

const router = express.Router();

router.get("/", getForumPost);
router.get("/:pId", getSingleForumPost);
router.post("/create", createForumPost);
router.put("/update/:pId", updateForumPost);
router.delete("/delete/:pId", deleteForumPost);

router.post("/upvote/:postId", upvotePost);
router.post("/downvote/:postId", downvotePost
);

export default router;
