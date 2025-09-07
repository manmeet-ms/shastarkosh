import express from "express";

import { createShastar, deleteShastar, getShastar, getSingleShastar, updateShastar } from "../controllers/shastarInfo.controller.js";
import { cacheMiddleware } from "../middlewares/cache.middleware.js";
import {authenticateJWT} from "../middlewares/auth.middleware.js"
const router = express.Router();

router.get("/", cacheMiddleware("shastars", 24 * 60 * 60 * 1000), getShastar);
router.get("/:sId", cacheMiddleware(24 * 60 * 60 * 1000), getSingleShastar);
router.post("/create", authenticateJWT, createShastar);
router.put("/update/:sId", authenticateJWT,updateShastar);
router.delete("/delete/:sId",authenticateJWT, deleteShastar); // only dmin should delete it 

export default router;
