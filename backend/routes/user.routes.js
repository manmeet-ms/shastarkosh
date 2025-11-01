import express from "express";
import { flushUsers, getUser, getUserContent, updateUserProfile } from "../controllers/user.controller.js";
import {authenticateJWT, isAdmin} from '../middlewares/auth.middleware.js'

const router = express.Router();

router.get("/u/:uid",authenticateJWT, getUser);
router.get("/u/:uid/content",authenticateJWT, getUserContent);

router.put("/update", authenticateJWT, updateUserProfile);
router.post("/flush",authenticateJWT,isAdmin,flushUsers );
export default router;
