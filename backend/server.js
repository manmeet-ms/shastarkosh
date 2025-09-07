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
import shastarRoutes from "./routes/shastarInfo.routes.js";
import forumPostRoutes from "./routes/forumPost.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import userRoutes from "./routes/user.routes.js";
import resourceMaterialRoutes from "./routes/resourceMaterials.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import commentsRoutes from "./routes/comment.routes.js";


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

// investigation routes
app.get("/api/routes", (req, res) => {
  const routesData = getExtractedRoutes();
  logger("info", `Served routes at ${process.env.VITE_BACKEND_URL.replace("api", "")}`, routesData);
  res.send(routesData);
});

app.get("/api/jwt-check", authenticateJWT, (req, res) => {
  res.send(req.user);
});
app.get("/api/cookies", (req, res) => {
  console.log(req.cookies);
  const { token } = req.cookies;
  // logger("info", req.cookies);
  // logger("log", "JWT token:", token);
  res.json(token); // user comes from JWT
});
