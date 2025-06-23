/**
 * PromoCodeField Component
 * ------------------------
 * A simple input field integrated with Formik for capturing a promo code.
 * - Handles real-time value updates through Formik
 * - Styled using Tailwind CSS
 */

export default function PromoCodeField({ formik }) {
    return (
        <div>
            {/* Label for the promo code input */}
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Promo Code
            </label>

            {/* Input field bound to Formik state */}
            <input
                name="promoCode" // Formik field name
                placeholder="Enter promo code"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formik.values.promoCode} // Bind value from Formik
                onChange={formik.handleChange} // Formik handles onChange internally
            />
        </div>
    );
}
