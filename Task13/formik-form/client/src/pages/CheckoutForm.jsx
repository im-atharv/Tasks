import { useEffect, useState, useRef } from "react";
import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { checkoutSchema } from "../constants/validationSchema";
import { useNavigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import toast, { Toaster } from "react-hot-toast";

import TextField from "../components/TextField";
import PasswordField from "../components/PasswordField";
import Address from "../components/Address";
import PromoCodeField from "../components/PromoCodeField";
import PlanSelector from "../components/PlanSelector";
import { postData } from "../utils/apiHelpers";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const initialValues = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  streetAddress: "",
  apartment: "",
  country: "",
  state: "",
  city: "",
  addressZip: "",
  radioTech: "",
  dataUsage: [],
  calculatedPrice: 0,
  promoCode: "",
};

function CheckoutStripeWrapper({ values, onPaymentSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!stripe || !elements) return;
    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/stripe-redirect-handler`,
      },
      redirect: "if_required",
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      navigate("/failure");
      return;
    }

    try {
      const result = await stripe.retrievePaymentIntent(paymentIntent.client_secret);
      if (result?.paymentIntent?.status === "succeeded") {
        onPaymentSuccess();
        navigate("/success");
      } else {
        toast.error(`Payment ${result.paymentIntent.status}`);
        navigate("/failure");
      }
    } catch (err) {
      console.error("Error retrieving payment intent:", err);
      toast.error("Failed to confirm payment status.");
      navigate("/failure");
    }

    setLoading(false);
  };

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
      <PaymentElement />
      <button
        onClick={handlePayment}
        className="mt-6 w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}

export default function CheckoutForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [clientSecret, setClientSecret] = useState("");
  const [formData, setFormData] = useState(null);
  const formikRef = useRef();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const status = query.get("redirect_status");

    if (status === "failed" || status === "canceled") {
      navigate("/failure", { replace: true });
    }
  }, [location.search, navigate]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (!values.calculatedPrice || values.calculatedPrice <= 0) {
        throw new Error("Please select a valid plan before submitting.");
      }

      // ✅ BLOCK submission if ZIP has an error
      const zipError = formikRef.current?.errors?.addressZip;
      if (zipError) {
        toast.error("Please fix the ZIP code before continuing.");
        setSubmitting(false);
        return;
      }

      const formattedValues = {
        ...values,
        radioTech: typeof values.radioTech === "string" ? values.radioTech : "",
      };

      const { clientSecret } = await postData(
        `${import.meta.env.VITE_API_BASE_URL}/payments/create-payment-intent`,
        { amount: formattedValues.calculatedPrice * 100 }
      );

      setClientSecret(clientSecret);
      setFormData(formattedValues);
    } catch (err) {
      toast.error(err.message || "Failed to initiate payment.");
      setSubmitting(false);
    }
  };

  const handlePaymentSuccess = async () => {
    if (!formData) return;
    try {
      await postData(`${import.meta.env.VITE_API_BASE_URL}/orders/submit`, formData);
      localStorage.setItem("lastOrder", JSON.stringify(formData));
      toast.success("✅ Payment & Order Successful!");
      navigate("/success");
    } catch (err) {
      toast.error("Order failed. Contact support.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <Toaster position="top-center" />
      <h1 className="text-2xl font-semibold mb-6">Checkout Form</h1>

      {!clientSecret ? (
        <Formik
          innerRef={formikRef}
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(checkoutSchema)}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className="space-y-6">
              <TextField name="email" type="email" label="Email Address" placeholder="Enter email" required />
              <div className="grid sm:grid-cols-2 gap-4">
                <TextField name="firstName" label="First Name" placeholder="John" required />
                <TextField name="lastName" label="Last Name" placeholder="Doe" required />
              </div>
              <PasswordField formik={formik} required />
              <TextField name="streetAddress" label="Street Address" placeholder="123 Main Street" required />
              <TextField name="apartment" label="Apartment, Suite, Office (Optional)" placeholder="e.g. A-203" />
              <Address formik={formik} required />
              <TextField
                name="addressZip"
                label="ZIP Code"
                placeholder="PIN"
                inputMode="numeric"
                maxLength={6}
                required
              />
              <h5 className="text-2xl font-semibold mb-2">Select Your Plan <span className="text-red-500">*</span></h5>
              <PlanSelector />
              <PromoCodeField formik={formik} />
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
              >
                Continue to Payment
              </button>
            </Form>
          )}
        </Formik>
      ) : (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutStripeWrapper values={formData} onPaymentSuccess={handlePaymentSuccess} />
        </Elements>
      )}
    </div>
  );
}
