import express from "express";
import authRouter from "./authRoutes.js"; // Ensure you use the .js extension
import reviewRouter from "./reviewRoutes.js";

const router = express.Router();

// Mounting the routes
router.use("/api/auth", authRouter);
router.use("/api/review", reviewRouter);

export default router; // Use ES Modules export
