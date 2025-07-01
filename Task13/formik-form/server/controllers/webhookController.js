import Stripe from "stripe";
import dotenv from "dotenv";
import { handleStripeEvent } from "../services/webhookService.js";
import { sendSuccess, sendError } from "../utils/helpers/responseHelpers.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhookHandler = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;
    console.log("------------------------------------------------------------------------");
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        console.log(`📦 Event received: ${event.type}`);
    } catch (err) {
        return sendError(res, err, "Webhook signature verification failed");
    }

    try {
        await handleStripeEvent(event);
        return sendSuccess(res, 200, { received: true }, "Webhook handled");
    } catch (err) {
        return sendError(res, err, "Failed to process Stripe event");
    }
};
