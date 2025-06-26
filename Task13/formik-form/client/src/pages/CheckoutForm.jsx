import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { checkoutSchema } from "../constants/validationSchema";
import { useStripe, useElements, CardNumberElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import TextField from "../components/TextField";
import PasswordField from "../components/PasswordField";
import Address from "../components/Address";
import PromoCodeField from "../components/PromoCodeField";
import CardFields from "../components/CardFields";
import PlanSelector from "../components/PlanSelector";

import { postData } from "../utils/apiHelpers";

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

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    setSubmitting(true);
    setLoading(true);

    try {
      if (!values.calculatedPrice || values.calculatedPrice <= 0) {
        throw new Error("Please select a valid plan before submitting.");
      }

      const formattedValues = {
        ...values,
        radioTech: typeof values.radioTech === "string" ? values.radioTech : "",
      };

      const { clientSecret } = await postData(
        `${import.meta.env.VITE_API_BASE_URL}/payments/create-payment-intent`,
        { amount: formattedValues.calculatedPrice * 100 }
      );

      if (!clientSecret) throw new Error("Missing clientSecret from server.");

      const cardElement = elements.getElement(CardNumberElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${formattedValues.firstName} ${formattedValues.lastName}`,
            email: formattedValues.email,
          },
        },
      });

      if (error) throw new Error(error.message);
      if (paymentIntent.status !== "succeeded") {
        throw new Error("Payment failed. Try again.");
      }

      await postData(`${import.meta.env.VITE_API_BASE_URL}/orders/submit`, formattedValues);

      localStorage.setItem("lastOrder", JSON.stringify(formattedValues));
      toast.success("✅ Payment & Order Successful!");
      resetForm();
      navigate("/success");
    } catch (err) {
      console.error("❌ Error:", err);
      toast.error(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <Toaster position="top-center" />
      <h1 className="text-2xl font-semibold mb-6">Checkout Form</h1>

      <Formik
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
            <TextField name="addressZip" label="ZIP Code" placeholder="PIN" inputMode="numeric" maxLength={6} required />

            {/* Plan Selection */}
            <h5 className="text-2xl font-semibold mb-2">Select Your Plan <span className="text-red-500">*</span></h5>
            <PlanSelector />

            {/* Payment Info */}
            <h5 className="text-2xl font-semibold mb-2">Payment Details <span className="text-red-500">*</span></h5>
            <CardFields />

            <PromoCodeField formik={formik} />

            <button
              type="submit"
              className="w-full py-3 rounded-lg transition text-white bg-indigo-600 hover:bg-indigo-700"
            >
              {loading ? "Processing..." : "Submit Payment"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
