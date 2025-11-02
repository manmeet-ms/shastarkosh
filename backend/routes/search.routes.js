// routes/search.routes.js
import express from "express";
import { globalSearch } from "../controllers/search.controller.js";
import { cacheMiddleware } from "../middlewares/cache.middleware.js";

const router = express.Router();

router.get("/", cacheMiddleware("search", 300000), globalSearch); // 5 min cache

export default router;

