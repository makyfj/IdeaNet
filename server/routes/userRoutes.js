import express from "express";

import {
  getUsers,
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { auth, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/all", auth, admin, getUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.route("/profile").get(auth, getUserProfile).put(auth, updateUserProfile);
router
  .route("/:id")
  .get(getUserById)
  .put(auth, updateUser)
  .delete(auth, deleteUser);

export { router as userRoutes };
