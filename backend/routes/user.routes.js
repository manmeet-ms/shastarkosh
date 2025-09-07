import express from "express";
import { flushUsers, getUser, updateUserProfile } from "../controllers/user.controller.js";


const router = express.Router();

router.get("/", getUser);

router.put("/update", updateUserProfile);
router.post("/flush",flushUsers );
export default router;
