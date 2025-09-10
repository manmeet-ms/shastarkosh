import express from "express";

import { createShastar, deleteShastar, getShastar, getSingleShastar, updateShastar } from "../controllers/shastarInfo.controller.js";
import { authenticateJWT, isAdmin } from "../middlewares/auth.middleware.js";
import { cacheMiddleware } from "../middlewares/cache.middleware.js";

const router = express.Router();

router.post("/create", authenticateJWT, createShastar);
router.put("/update/:sId", authenticateJWT, updateShastar);
router.delete("/delete/:sId", authenticateJWT, isAdmin, deleteShastar); // only dmin should delete it , maybe send an email to admin for deletion request
router.get("/s/:sId", cacheMiddleware("single_shastar",24 * 60 * 60 * 1000), getSingleShastar);
router.get("/", cacheMiddleware("shastars", 24 * 60 * 60 * 1000), getShastar);

export default router;
