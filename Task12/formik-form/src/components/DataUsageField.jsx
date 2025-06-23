/**
 * DataUsageField.jsx
 *
 * Purpose:
 * This reusable component renders a group of radio buttons to capture
 * the user's expected monthly data usage. It works with Formik for state
 * management and validation.
 *
 * Props:
 * - formik: Formik context passed from parent form, containing values, errors, touched, and handlers.
 *
 * Data Source:
 * - Options for selection are imported from a constant `DATA_USAGE_OPTIONS` (e.g., ["1GB", "5GB", "10GB", ...])
 */

import { DATA_USAGE_OPTIONS } from "../constants/constants.js";

export default function DataUsageField({ formik }) {
    return (
        <div>
            {/* Label for the entire field group */}
            <label className="block text-sm font-medium text-gray-700 mb-1">
                How much data do you expect to use each month?
            </label>

            {/* Render each option as a radio input */}
            <div className="flex flex-wrap gap-4">
                {DATA_USAGE_OPTIONS.map((range) => (
                    <label key={range} className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="dataUsage"
                            value={range}
                            checked={formik.values.dataUsage === range} // controlled by Formik
                            onChange={formik.handleChange} // updates value in Formik state
                        />
                        {range}
                    </label>
                ))}
            </div>

            {/* Display validation error if field was touched and has error */}
            {formik.touched.dataUsage && formik.errors.dataUsage && (
                <p className="text-sm text-red-500 mt-1">{formik.errors.dataUsage}</p>
            )}
        </div>
    );
}
