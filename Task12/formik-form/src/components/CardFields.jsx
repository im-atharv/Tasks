import React, { useRef } from "react";
import { usePaymentInputs } from "react-payment-inputs"; // For formatting and managing card input

// Reusable card input fields component used in the Checkout form
export default function CardFields({ formik }) {
    // Refs to auto-focus next input fields
    const expiryRef = useRef();
    const cvvRef = useRef();
    const zipRef = useRef();

    // Get props helper from react-payment-inputs to auto-format card number
    const { getCardNumberProps } = usePaymentInputs();

    // Handle Card Number input - keep only digits, format in groups of 4
    const handleCardInput = (e) => {
        const raw = e.target.value.replace(/\D/g, "").slice(0, 16); // remove non-digits, limit to 16 digits
        formik.setFieldValue("cardNumber", raw.replace(/(.{4})/g, "$1 ").trim()); // group by 4 and update formik
        if (raw.length === 16) expiryRef.current?.focus(); // move to expiry input if full
    };

    // Handle expiry date select change - set value and focus next
    const handleExpiryChange = (e) => {
        formik.setFieldValue("expiry", e.target.value);
        cvvRef.current?.focus(); // move to CVV field
    };

    // Handle CVV input - only digits, 3 max, then focus ZIP
    const handleCvvInput = (e) => {
        const val = e.target.value.replace(/\D/g, "").slice(0, 3);
        formik.setFieldValue("cvv", val);
        if (val.length === 3) zipRef.current?.focus();
    };

    // Handle ZIP code input - digits only, max 6 digits
    const handleZipChange = (e) => {
        formik.setFieldValue("cardZip", e.target.value.replace(/\D/g, "").slice(0, 6));
    };

    // Generate list of valid MM/YY expiry options (current month onwards for 10 years)
    const generateExpiryOptions = () => {
        const currentYear = new Date().getFullYear() % 100; // two-digit year
        const currentMonth = new Date().getMonth() + 1; // JS months are 0-based
        const opts = [];

        for (let y = currentYear; y <= currentYear + 10; y++) {
            for (let m = 1; m <= 12; m++) {
                if (!(y === currentYear && m < currentMonth)) {
                    opts.push(`${String(m).padStart(2, "0")}/${String(y).padStart(2, "0")}`);
                }
            }
        }

        return opts;
    };

    // Common styling for inputs
    const inputStyle = "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none";

    return (
        <div className="space-y-4 mt-6">
            {/* CARD NUMBER */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input
                    {...getCardNumberProps({
                        value: formik.values.cardNumber,
                        onChange: handleCardInput,
                    })}
                    onBlur={() => formik.setFieldTouched("cardNumber", true)}
                    className={inputStyle + " tracking-widest"}
                    placeholder="0000 0000 0000 0000"
                />
                {formik.touched.cardNumber && formik.errors.cardNumber && (
                    <p className="text-sm text-red-500 mt-1">{formik.errors.cardNumber}</p>
                )}
            </div>

            {/* EXPIRY / CVV / ZIP */}
            <div className="grid grid-cols-3 gap-4">
                {/* EXPIRY */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                    <select
                        ref={expiryRef}
                        name="expiry"
                        value={formik.values.expiry}
                        onChange={handleExpiryChange}
                        onBlur={() => formik.setFieldTouched("expiry", true)}
                        className={inputStyle}
                    >
                        <option value="">MM/YY</option>
                        {generateExpiryOptions().map((op) => (
                            <option key={op} value={op}>{op}</option>
                        ))}
                    </select>
                    {formik.touched.expiry && formik.errors.expiry && (
                        <p className="text-sm text-red-500 mt-1">{formik.errors.expiry}</p>
                    )}
                </div>

                {/* CVV */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                        ref={cvvRef}
                        name="cvv"
                        type="password"
                        value={formik.values.cvv}
                        onChange={handleCvvInput}
                        onBlur={() => formik.setFieldTouched("cvv", true)}
                        className={inputStyle}
                        placeholder="123"
                    />
                    {formik.touched.cvv && formik.errors.cvv && (
                        <p className="text-sm text-red-500 mt-1">{formik.errors.cvv}</p>
                    )}
                </div>

                {/* CARD ZIP CODE */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP</label>
                    <input
                        ref={zipRef}
                        name="cardZip"
                        value={formik.values.cardZip}
                        onChange={handleZipChange}
                        onBlur={() => formik.setFieldTouched("cardZip", true)}
                        className={inputStyle}
                        placeholder="ZIP"
                    />
                    {formik.touched.cardZip && formik.errors.cardZip && (
                        <p className="text-sm text-red-500 mt-1">{formik.errors.cardZip}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
