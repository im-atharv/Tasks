export const handleStripeEvent = async (event) => {
    switch (event.type) {
        case "payment_intent.succeeded": {
            const paymentIntent = event.data.object;
            console.log("✅ PaymentIntent succeeded:", paymentIntent.id);
            // TODO: Save payment record to DB, update order, etc.
            break;
        }

        case "payment_intent.payment_failed": {
            const failedIntent = event.data.object;
            console.log("❌ PaymentIntent failed:", failedIntent.id);
            // TODO: Log failure or notify user
            break;
        }

        case "charge.succeeded": {
            const charge = event.data.object;
            console.log("💳 Charge succeeded:", charge.id);
            break;
        }

        default:
            console.log(`⚠️ Unhandled event type: ${event.type}`);
    }
};
