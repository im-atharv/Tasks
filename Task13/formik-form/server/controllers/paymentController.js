import { generatePaymentIntent } from "../services/paymentService.js";
import { sendSuccess, sendError } from "../utils/helpers/responseHelpers.js";

export const createPaymentIntentController = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || typeof amount !== "number") {
      return sendError(res, { message: "Invalid amount provided." });
    }

    const clientSecret = await generatePaymentIntent(amount);
    return sendSuccess(res, 200, { clientSecret }, "Payment intent created");
  } catch (err) {
    return sendError(res, err);
  }
};
