// Import React state hook, zxcvbn password strength estimator, and Eye icons from react-icons
import { useState } from "react";
import zxcvbn from "zxcvbn";
import { FiEye, FiEyeOff } from "react-icons/fi";

/**
 * PasswordField Component
 * ------------------------
 * Custom password input field with:
 * - Toggle visibility (eye/eye-slash)
 * - Password strength meter (based on zxcvbn)
 * - Error display using Formik validation
 */
export default function PasswordField({ formik }) {
    // Destructure Formik props for input value, change handler, blur status, and validation errors
    const { values, handleChange, touched, errors } = formik;

    // Local state to toggle password visibility
    const [showPassword, setShowPassword] = useState(false);

    // Calculate password strength score (0–4) using zxcvbn
    const result = zxcvbn(values.password || "");
    const strength = result.score;

    // Define bar colors and labels for each strength level
    const strengthColors = ["#991B1B", "#B45309", "#92400E", "#1D4ED8", "#065F46"];
    const strengthLabels = ["Too weak", "Weak", "Okay", "Strong", "Excellent"];

    // Convert strength score to a percentage width (0%, 25%, ..., 100%)
    const widthPercentage = `${(strength / 4) * 100}%`;

    return (
        <div>
            {/* Input Label */}
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>

            {/* Password input field with Eye toggle for show/hide */}
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"} // Toggle input type
                    name="password"
                    placeholder="Enter password"
                    className="w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                />

                {/* Eye icon toggle button */}
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-600 text-lg"
                >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
            </div>

            {/* Password Strength Indicator */}
            {values.password && (
                <div className="mt-2 w-1/4"> {/* Strength bar width limited to 1/4th of the form */}
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        {/* Dynamic strength fill bar */}
                        <div
                            className="h-full rounded-full transition-all duration-500 ease-out"
                            style={{
                                width: widthPercentage, // Width reflects strength
                                backgroundColor: strengthColors[strength], // Color reflects strength
                            }}
                        />
                    </div>

                    {/* Strength label text */}
                    <p className="text-xs mt-1 text-gray-600">{strengthLabels[strength]}</p>
                </div>
            )}

            {/* Validation error display (Formik) */}
            {touched.password && errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
        </div>
    );
}
