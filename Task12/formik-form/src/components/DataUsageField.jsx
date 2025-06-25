import { useFormikContext } from "formik";
import { DATA_USAGE_OPTIONS } from "../constants/constants.js";

export default function DataUsageField() {
    const { values, handleChange, touched, errors } = useFormikContext();

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                How much data do you expect to use each month?
            </label>

            <div className="flex flex-wrap gap-4">
                {DATA_USAGE_OPTIONS.map((range) => (
                    <label key={range} className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="dataUsage"
                            value={range}
                            checked={values.dataUsage === range}
                            onChange={handleChange}
                        />
                        {range}
                    </label>
                ))}
            </div>

            {touched.dataUsage && errors.dataUsage && (
                <p className="text-sm text-red-500 mt-1">{errors.dataUsage}</p>
            )}
        </div>
    );
}
