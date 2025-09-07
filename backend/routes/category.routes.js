import express from "express";

import { createCategory, delCategory, flushCategories, getCategories, getSingleCategory, updateCategpy } from "../controllers/category.controller.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/:cId", getSingleCategory);
router.post("/create", createCategory);
router.post("/update/:cId", updateCategpy);
router.post("/delete/:cId", delCategory);
router.post("/flush", flushCategories);

export default router;
