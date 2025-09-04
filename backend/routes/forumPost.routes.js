import express from "express";

import { createForumPost, deleteForumPost, getForumPost, getSingleForumPost, updateForumPost } from "../controllers/forumPost.controller.js";

const router = express.Router();

router.get("/", getForumPost);
router.get("/:pId", getSingleForumPost);
router.post("/create", createForumPost);
router.put("/update/:pId", updateForumPost);
router.delete("/delete/:pId", deleteForumPost);

export default router;
