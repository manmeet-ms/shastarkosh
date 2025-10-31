import express from "express";

import {
    createResourceMaterial,
    deleteResourceMaterial,
    getResourceMaterial,
    getSingleResourceMaterial,
    likeResourceMaterial,
    updateResourceMaterial
} from "../controllers/resourceMaterial.controller.js";
import { authenticateJWT, isAdmin } from "../middlewares/auth.middleware.js";
import { cacheMiddleware } from "../middlewares/cache.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = express.Router();

router.get("/", cacheMiddleware("resourceMaterials", 24 * 60 * 60 * 1000), getResourceMaterial);
router.get("/r/:rId", cacheMiddleware("singleResourceMaterials",24 * 60 * 60 * 1000), getSingleResourceMaterial);
router.post("/create", authenticateJWT, upload.fields([
  { name: "mainImage", maxCount: 1 },
  { name: "pdfFile", maxCount: 1 },
  { name: "images", maxCount: 5 },
  { name: "videos", maxCount: 3 }
]),createResourceMaterial);
router.put("/update/:rId", authenticateJWT,updateResourceMaterial);
router.delete("/delete/:rId",authenticateJWT,isAdmin, deleteResourceMaterial); // only dmin should deleteResourceMaterialit 
router.post("/like/:rId", likeResourceMaterial);
// router.post("/downvote/:rId", downvotePost
// );
export default router;
