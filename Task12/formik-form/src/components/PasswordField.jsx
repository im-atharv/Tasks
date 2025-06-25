import { useState } from "react";
import { useField, useFormikContext } from "formik";
import zxcvbn from "zxcvbn";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function PasswordField() {
  const [field, meta] = useField("password");
  const { values, handleChange, handleBlur } = useFormikContext();
  const [showPassword, setShowPassword] = useState(false);

  const password = values.password || "";
  const { score } = zxcvbn(password);
  const strengthColors = ["#DC2626", "#F59E0B", "#D97706", "#3B82F6", "#10B981"];
  const strengthLabels = ["Too Weak", "Weak", "Fair", "Strong", "Excellent"];
  const widthPercentage = `${(score / 4) * 100}%`;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          {...field}
          placeholder="Enter password"
          className="w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-2.5 text-gray-600 text-lg"
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>

      {/* Password strength meter */}
      {password && (
        <div className="mt-2 w-full sm:w-1/3">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-in-out"
              style={{
                width: widthPercentage,
                backgroundColor: strengthColors[score],
              }}
            />
          </div>
          <p className="text-xs mt-1 text-gray-600">{strengthLabels[score]}</p>
        </div>
      )}

      {/* Error Message */}
      {meta.touched && meta.error && (
        <p className="text-sm text-red-500 mt-1">{meta.error}</p>
      )}
    </div>
  );
}
