// controllers/paymentController.js
import Stripe from "stripe";
import { sendSuccess, sendError } from "../utils/helpers/responseHelpers.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntentController = async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true, // ✅ Enables card, UPI, wallets etc
      },
    });

    return sendSuccess(res, 200, { clientSecret: paymentIntent.client_secret });
  } catch (err) {
    return sendError(res, err);
  }
};
