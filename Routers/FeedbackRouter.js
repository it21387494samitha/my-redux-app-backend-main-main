import express from "express";
import VerifyToken from "../Middleware/VerifyToken.js";
import { CreateFeedback } from "../Controllers/FeedbackController.js";

const router = express.Router();

// Route to create feedback
router.post('/', VerifyToken, CreateFeedback);

export default router;
