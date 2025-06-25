import { useFormikContext } from "formik";

export default function PromoCodeField() {
    const { values, handleChange } = useFormikContext();

    return (
        <div>
            {/* Label for the promo code input */}
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Promo Code
            </label>

            {/* Input field bound to Formik state */}
            <input
                name="promoCode"
                placeholder="Enter promo code"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={values.promoCode}
                onChange={handleChange}
            />
        </div>
    );
}
