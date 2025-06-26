// services/paymentService.js
import dotenv from "dotenv";
dotenv.config();

import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("❌ STRIPE_SECRET_KEY is not defined in .env");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-04-10",
});

/**
 * Generate a Stripe PaymentIntent and return its client_secret
 * @param {number} amount - Amount in smallest unit (e.g. ₹500 = 50000 paise)
 * @returns {Promise<string>}
 */
export const generatePaymentIntent = async (amount) => {
  if (!amount || typeof amount !== "number") {
    throw new Error("❌ Invalid payment amount.");
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "inr",
    automatic_payment_methods: { enabled: true },
  });

  return paymentIntent.client_secret;
};
