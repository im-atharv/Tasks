import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useStripe } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";

export default function StripeRedirectHandler() {
    const navigate = useNavigate();
    const location = useLocation();
    const stripe = useStripe();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const clientSecret = query.get("payment_intent_client_secret");

        if (!clientSecret || !stripe) {
            console.error("Missing client secret or stripe not ready");
            setLoading(false);
            return;
        }

        async function checkPaymentStatus() {
            try {
                const result = await stripe.retrievePaymentIntent(clientSecret);

                if (result.paymentIntent?.status === "succeeded") {
                    navigate("/success");
                } else {
                    toast.error(`Payment ${result.paymentIntent.status}`);
                    navigate("/failure");
                }
            } catch (err) {
                console.error("Stripe error:", err);
                toast.error("Failed to retrieve payment status");
                navigate("/failure");
            } finally {
                setLoading(false);
            }
        }

        checkPaymentStatus();
    }, [stripe, location.search, navigate]);

    return (
        <div className="text-center mt-20 text-gray-600">
            {loading ? "Validating payment..." : "Redirecting..."}
        </div>
    );
}
