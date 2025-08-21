import express from "express";
import { saveAdventure, getAdventures } from "../controllers/adventureController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// A single route to save a new adventure
router.post("/save", authMiddleware, saveAdventure);

// Route to get all of a user's saved adventures
router.get("/my", authMiddleware, getAdventures);

export default router;