import express from "express";
import { saveOrder } from "../controllers/orderController.js";
import { rateLimiter } from "../utils/middleware/rateLimiter.js";

const router = express.Router();
router.post("/submit", rateLimiter, saveOrder);
export default router;