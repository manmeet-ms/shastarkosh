import express from "express";

import { createCategory, delCategory, flushCategories, getCategories, getSingleCategory, updateCategpy } from "../controllers/category.controller.js";
import { authenticateJWT, isAdmin } from "../middlewares/auth.middleware.js";
import { cacheMiddleware } from "../middlewares/cache.middleware.js";
import Category from "../models/Category.model.js";

const router = express.Router();

router.get(
  "/",
  //  cacheMiddleware ("allCategories", 4*24*60*60*1000),
  getCategories
);
router.post("/create", authenticateJWT, createCategory);
router.post("/update/:cId", authenticateJWT, updateCategpy);
router.post("/delete/:cId", authenticateJWT, delCategory);
router.post("/flush", authenticateJWT, isAdmin, flushCategories);
router.get("/c/:cId", getSingleCategory);
router.get("/t", cacheMiddleware("category_type", 4 * 24 * 60 * 60 * 1000), async (req, res) => {
  try {
    const { type } = req.query;
    console.log(type);
    const resCat = await Category.find({ categoryType: type });

    const result = resCat;
    console.log(result.length);

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

export default router;
