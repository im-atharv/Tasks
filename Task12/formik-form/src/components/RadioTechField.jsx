import { useFormikContext } from "formik";
import { RADIO_TECH_OPTIONS } from "../constants/constants.js";

export default function RadioTechField() {
  const { values, setFieldValue, touched, errors } = useFormikContext();

  const toggleOption = (val) => {
    const current = values.radioTech || [];
    const updated = current.includes(val)
      ? current.filter((v) => v !== val)
      : [...current, val];
    setFieldValue("radioTech", updated);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        What radio technologies are you using?
      </label>

      <div className="flex flex-wrap gap-4">
        {RADIO_TECH_OPTIONS.map((option) => (
          <label key={option} className="flex items-center gap-2">
            <input
              type="checkbox"
              name="radioTech"
              value={option}
              checked={values.radioTech?.includes(option)}
              onChange={() => toggleOption(option)}
            />
            {option}
          </label>
        ))}
      </div>

      {touched.radioTech && errors.radioTech && (
        <p className="text-sm text-red-500 mt-1">{errors.radioTech}</p>
      )}
    </div>
  );
}
