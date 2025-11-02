import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";



import "../extractRoutes.js";
import { getExtractedRoutes } from "../extractRoutes.js";
import "../src/utils/cron.utils.js";
import logger from "../src/utils/logger.utils.js";
// Import cron jobs

import { connectDB } from "./config/mongodb.js";
import { authenticateJWT } from "./middlewares/auth.middleware.js";
// not "passport"
// routes

//// import authRoutes from "./routes/auth.route.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import shastarRoutes from "./routes/shastarInfo.routes.js";
import forumPostRoutes from "./routes/forumPost.routes.js";
import resourceMaterialRoutes from "./routes/resourceMaterials.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import commentsRoutes from "./routes/comment.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import searchRoutes from "./routes/search.routes.js";
import aiRoutes from "./routes/ai.routes.js";

const app = express();

const port = process.env.SERVER_PORT || 3000;

app.use(
    cors({
      origin:true,
      credentials:true
    } )
);
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
 
connectDB();
 

 

// Add routes here
app.get("/", (req, res) => res.send({ message: "Welcome to Shastarkosh" }));

app.get("/api", (req, res) => res.send({ message: "This is /api" }));

app.listen(port, () => logger("info", `Server running on ${port}`));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/shastars", shastarRoutes);
app.use("/api/posts",forumPostRoutes)
app.use("/api/notifications",notificationRoutes)
app.use("/api/resources",resourceMaterialRoutes)
app.use("/api/category",categoryRoutes)
app.use("/api/comments",commentsRoutes)
app.use("/api/analytics",analyticsRoutes)
app.use("/api/search",searchRoutes)
app.use("/api/ai", aiRoutes)

// investigation routes
app.get("/api/routes", (req, res) => {
  const routesData = getExtractedRoutes();
  logger("info", `Served routes at ${process.env.BACKEND_URL.replace("api", "")}`, routesData);
  res.send(routesData);
});

app.get("/api/jwt-check", authenticateJWT, (req, res) => {
  res.send(req.user);
});
