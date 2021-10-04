import express from "express";
import {
  getIdeas,
  addIdea,
  getIdea,
  updateIdea,
  deleteIdea,
} from "../controllers/ideaController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/all", getIdeas);
router.post("/idea", auth, addIdea);
router
  .route("/:id")
  .get(getIdea)
  .put(auth, updateIdea)
  .delete(auth, deleteIdea);

export { router as ideaRoutes };
