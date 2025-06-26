// routes/paymentRoutes.js
import express from "express";
import { createPaymentIntentController } from "../controllers/paymentController.js";

const router = express.Router();

// POST /api/payments/create-payment-intent
router.post("/create-payment-intent", createPaymentIntentController);

export default router;
