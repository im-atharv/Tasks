import { useField } from "formik";

export default function TextField({ label, required, ...props }) {
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        {...field}
        {...props}
        className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 ${hasError
          ? "border-red-500 focus:ring-red-400"
          : "focus:ring-indigo-500"
          }`}
      />
      {hasError && (
        <p className="text-sm text-red-500 mt-1">{meta.error}</p>
      )}
    </div>
  );
}
