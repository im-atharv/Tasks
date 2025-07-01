// routes/paymentRoutes.js
import express from "express";
import { createPaymentIntentController } from "../controllers/paymentController.js";
import { rateLimiter } from "../utils/middleware/rateLimiter.js";

const router = express.Router();

// POST /api/payments/create-payment-intent
router.post("/create-payment-intent", rateLimiter, createPaymentIntentController);

export default router;
