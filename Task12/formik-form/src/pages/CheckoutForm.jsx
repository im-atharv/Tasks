// Importing Formik for form state management, Form for handling submission
import { Formik, Form } from "formik";

// Converts Zod validation schema to Formik-compatible validation
import { toFormikValidationSchema } from "zod-formik-adapter";

// Zod schema used for validation
import { checkoutSchema } from "../constants/validationSchema";

// Static list of Indian cities for city selection dropdown
import { INDIA_CITIES } from "../constants/constants.js";

// Modular reusable field components for form
import PasswordField from "../components/PasswordField";
import CardFields from "../components/CardFields";
import RadioTechField from "../components/RadioTechField";
import DataUsageField from "../components/DataUsageField";
import PromoCodeField from "../components/PromoCodeField";

// Initial values for Formik form fields
const initialValues = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    streetAddress: "",
    apartment: "",
    city: "",
    addressZip: "",
    cardZip: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    radioTech: [],   // Array of selected radio technologies
    dataUsage: "",   // Expected data usage range
    promoCode: "",   // Optional promo code
};

// Main Checkout Form Component
export default function CheckoutForm() {
    // Handler called on form submit
    const handleSubmit = (values) => {
        console.log("Submitted:", values);
        alert("Payment submitted!");
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Checkout Form</h2>

            {/* Formik Wrapper */}
            <Formik
                initialValues={initialValues}
                validationSchema={toFormikValidationSchema(checkoutSchema)} // Zod schema adapted for Formik
                onSubmit={handleSubmit}
            >
                {(formik) => (
                    <Form className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Enter email"
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
                            )}
                        </div>

                        {/* First and Last Name Fields */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input
                                    name="firstName"
                                    placeholder="Enter first name"
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.firstName && formik.errors.firstName && (
                                    <p className="text-sm text-red-500 mt-1">{formik.errors.firstName}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input
                                    name="lastName"
                                    placeholder="Enter last name"
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.lastName && formik.errors.lastName && (
                                    <p className="text-sm text-red-500 mt-1">{formik.errors.lastName}</p>
                                )}
                            </div>
                        </div>

                        {/* Password Field (modular component) */}
                        <PasswordField formik={formik} />

                        {/* Address Section */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                            <input
                                name="streetAddress"
                                placeholder="123 Main Street"
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={formik.values.streetAddress}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.streetAddress && formik.errors.streetAddress && (
                                <p className="text-sm text-red-500 mt-1">{formik.errors.streetAddress}</p>
                            )}
                        </div>

                        {/* Optional apartment/suite input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Apartment, Suite, Office, etc. (Optional)
                            </label>
                            <input
                                name="apartment"
                                placeholder="Apartment, Suite, etc."
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={formik.values.apartment}
                                onChange={formik.handleChange}
                            />
                        </div>

                        {/* City & Address ZIP */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <select
                                    name="city"
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={formik.values.city}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="">Select city</option>
                                    {INDIA_CITIES.map((city) => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                                {formik.touched.city && formik.errors.city && (
                                    <p className="text-sm text-red-500 mt-1">{formik.errors.city}</p>
                                )}
                            </div>

                            {/* ZIP code for the address (5 or 6 digits only) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                                <input
                                    name="addressZip"
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={6}
                                    placeholder="ZIP"
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={formik.values.addressZip}
                                    onChange={(e) =>
                                        formik.setFieldValue("addressZip", e.target.value.replace(/\D/g, ""))
                                    }
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.addressZip && formik.errors.addressZip && (
                                    <p className="text-sm text-red-500 mt-1">{formik.errors.addressZip}</p>
                                )}
                            </div>
                        </div>

                        {/* Credit Card Fields (card number, expiry, cvv, cardZip) */}
                        <CardFields formik={formik} />

                        {/* Tech Selection (checkbox array) */}
                        <RadioTechField formik={formik} />

                        {/* Data Usage Field (radio or select) */}
                        <DataUsageField formik={formik} />

                        {/* Promo Code Field (optional) */}
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
