import express from "express";

import { leaderboardUsers } from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/leaderboard", leaderboardUsers);

export default router;
