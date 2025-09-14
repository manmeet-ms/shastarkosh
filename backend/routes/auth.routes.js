import express from "express";

import { loginUser, logoutUser, registerUser, resetPasswordUser, verifyUser } from "../controllers/auth.controller.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import { cacheMiddleware } from "../middlewares/cache.middleware.js";
import User from "../models/User.model.js";

const router = express.Router();
router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/verify", verifyUser);
router.post("/reset-password", authenticateJWT, resetPasswordUser);
router.post("/logout",authenticateJWT, logoutUser);

router.get("/me", authenticateJWT, 
  // cacheMiddleware("userProfile", 24 * 60 * 60 * 1000), 
  async (req, res) => {
  try {
    const { id } = req.user;
  const currentUser = await User.findById(id);
  // console.log(currentUser)
 
  if (currentUser) {
    res.json({
    currentUser: { _id: currentUser._id, name: currentUser.name, username: currentUser.username, email: currentUser.email, role: currentUser.role, avatar: currentUser.avatar, createdAt: currentUser.createdAt },
  });
    
  }
  } catch (err) {
    res.status(400).json(err.message);


    
  }
});
//   res.json({
//     user: req.user, // comes from decoded JWT (id, username, role, etc.)
//     // token: req.cookies.token, // return token from cookie if needed
//   });});

export default router;
