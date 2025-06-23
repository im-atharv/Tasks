/**
 * RadioTechField Component
 * ------------------------
 * This component renders a checkbox group for selecting one or more radio technologies.
 * - Data is sourced from RADIO_TECH_OPTIONS constant.
 * - Integrated with Formik for form state management and validation.
 * - Supports multiple selections using an array in formik.values.radioTech.
 */

import { RADIO_TECH_OPTIONS } from "../constants/constants.js";

export default function RadioTechField({ formik }) {
  return (
    <div>
      {/* Field Label */}
      <label className="block text-sm font-medium text-gray-700 mb-1">
        What radio technologies are you using?
      </label>

      {/* Render checkbox list from constants */}
      <div className="flex flex-wrap gap-4">
        {RADIO_TECH_OPTIONS.map((option) => (
          <label key={option} className="flex items-center gap-2">
            <input
              type="checkbox"
              name="radioTech"
              value={option}
              // Check if current option is selected
              checked={formik.values.radioTech.includes(option)}
              onChange={(e) => {
                const val = e.target.value;
                const current = formik.values.radioTech;

                // Toggle option: add if not present, remove if already selected
                const updated = current.includes(val)
                  ? current.filter((v) => v !== val)
                  : [...current, val];

                // Update Formik state
                formik.setFieldValue("radioTech", updated);
              }}
            />
            {option}
          </label>
        ))}
      </div>

      {/* Error display if validation fails */}
      {formik.touched.radioTech && formik.errors.radioTech && (
        <p className="text-sm text-red-500 mt-1">{formik.errors.radioTech}</p>
      )}
    </div>
  );
}
