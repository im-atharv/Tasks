import express from "express";
import bodyParser from "body-parser";
import { stripeWebhookHandler } from "../controllers/webhookController.js";
import { rateLimiter } from "../utils/middleware/rateLimiter.js";

const router = express.Router();

router.post("/webhook", rateLimiter, bodyParser.raw({ type: "application/json" }), stripeWebhookHandler);

export default router;
