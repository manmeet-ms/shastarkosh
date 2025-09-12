import express from "express";
import { flushUsers, getUser, updateUserProfile } from "../controllers/user.controller.js";
import {authenticateJWT, isAdmin} from '../middlewares/auth.middleware.js'

const router = express.Router();

router.get("/u/:uid",authenticateJWT, getUser);

router.put("/update", authenticateJWT, updateUserProfile);
router.post("/flush",authenticateJWT,isAdmin,flushUsers );
export default router;
