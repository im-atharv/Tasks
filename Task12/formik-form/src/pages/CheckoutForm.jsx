import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { checkoutSchema } from "../constants/validationSchema";

// Modular field components
import TextField from "../components/TextField";
import PasswordField from "../components/PasswordField";
import CardFields from "../components/CardFields";
import RadioTechField from "../components/RadioTechField";
import DataUsageField from "../components/DataUsageField";
import PromoCodeField from "../components/PromoCodeField";
import Address from "../components/Address.jsx";

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
    cardZip: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    radioTech: [],
    dataUsage: "",
    promoCode: "",
};

export default function CheckoutForm() {
    const handleSubmit = (values, { resetForm }) => {
        console.log("Submitted:", values);
        alert("Payment submitted!");
        resetForm();
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 ">Checkout Form</h2>

            <Formik
                initialValues={initialValues}
                validationSchema={toFormikValidationSchema(checkoutSchema)}
                onSubmit={handleSubmit}
            >
                {(formik) => (
                    <Form className="space-y-6">
                        {/* Email */}
                        <TextField name="email" type="email" label="Email Address" placeholder="Enter email" />

                        {/* Name Fields */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <TextField name="firstName" label="First Name" placeholder="John" />
                            <TextField name="lastName" label="Last Name" placeholder="Doe" />
                        </div>

                        {/* Password */}
                        <PasswordField formik={formik} />

                        {/* Address Fields */}
                        <TextField name="streetAddress" label="Street Address" placeholder="123 Main Street" />
                        <TextField name="apartment" label="Apartment, Suite, Office (Optional)" placeholder="e.g. A-203" />
                        <Address formik={formik} />

                        {/* ZIP Code */}
                        <TextField
                            name="addressZip"
                            label="ZIP Code"
                            placeholder="PIN"
                            inputMode="numeric"
                            maxLength={6}
                        />

                        {/* Card Fields */}
                        <CardFields formik={formik} />

                        {/* Tech Options */}
                        <RadioTechField formik={formik} />

                        {/* Data Usage */}
                        <DataUsageField formik={formik} />

                        {/* Promo Code */}
                        <PromoCodeField formik={formik} />

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
                        >
                            Submit Payment
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
