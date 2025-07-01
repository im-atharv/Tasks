import express from "express";
import bodyParser from "body-parser";
import { stripeWebhookHandler } from "../controllers/webhookController.js";

const router = express.Router();

// Using raw body ONLY for this route (Stripe requirement)
router.post("/webhook", bodyParser.raw({ type: "application/json" }), stripeWebhookHandler);

export default router;
