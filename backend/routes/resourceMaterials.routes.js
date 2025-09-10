import express from "express";

import {
    createResourceMaterial,
    deleteResourceMaterial,
    getResourceMaterial,
    getSingleResourceMaterial,
    updateResourceMaterial
} from "../controllers/resourceMaterial.controller.js";
import { authenticateJWT, isAdmin } from "../middlewares/auth.middleware.js";
import { cacheMiddleware } from "../middlewares/cache.middleware.js";
const router = express.Router();

router.get("/", cacheMiddleware("resourceMaterials", 24 * 60 * 60 * 1000), getResourceMaterial);
router.get("/r/:rId", cacheMiddleware("singleResourceMaterials",24 * 60 * 60 * 1000), getSingleResourceMaterial);
router.post("/create", authenticateJWT, createResourceMaterial);
router.put("/update/:rId", authenticateJWT,updateResourceMaterial);
router.delete("/delete/:rId",authenticateJWT,isAdmin, deleteResourceMaterial); // only dmin should deleteResourceMaterialit 

export default router;
