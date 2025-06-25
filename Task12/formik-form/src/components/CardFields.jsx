import React, { useRef } from "react";
import { useFormikContext } from "formik";
import TextField from "./TextField";

// Helper for updating a Formik field with value + touched
const updateField = (setFieldValue, setFieldTouched) => (name, value) => {
    setFieldValue(name, value);
    setFieldTouched(name, true, false);
};

export default function CardFields() {
    const {
        values,
        setFieldValue,
        setFieldTouched,
        errors,
        touched,
    } = useFormikContext();

    const cardRef = useRef();
    const expiryRef = useRef();
    const cvvRef = useRef();
    const zipRef = useRef();

    const handleUpdate = updateField(setFieldValue, setFieldTouched);

    const handleCardInput = (e) => {
        const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
        handleUpdate("cardNumber", raw.replace(/(.{4})/g, "$1 ").trim());
        if (raw.length === 16) expiryRef.current?.focus();
    };

    const handleExpiryChange = (e) => {
        handleUpdate("expiry", e.target.value);
        cvvRef.current?.focus();
    };

    const handleCvvInput = (e) => {
        const val = e.target.value.replace(/\D/g, "").slice(0, 3);
        const lastChar = e.nativeEvent?.data;
        handleUpdate("cvv", val);

        if (val.length === 3 && lastChar) zipRef.current?.focus();
        if (val.length === 0 && lastChar === null) expiryRef.current?.focus();
    };

    const handleZipChange = (e) => {
        const val = e.target.value.replace(/\D/g, "").slice(0, 6);
        const lastChar = e.nativeEvent?.data;
        handleUpdate("cardZip", val);

        if (val.length === 0 && lastChar === null) cvvRef.current?.focus();
    };

    const generateExpiryOptions = () => {
        const now = new Date();
        const startYear = now.getFullYear() % 100;
        const startMonth = now.getMonth() + 1;

        return Array.from({ length: 11 }, (_, y) => startYear + y)
            .flatMap((year) =>
                Array.from({ length: 12 }, (_, m) => {
                    const month = m + 1;
                    if (year === startYear && month < startMonth) return null;
                    return `${String(month).padStart(2, "0")}/${String(year).padStart(2, "0")}`;
                }).filter(Boolean)
            );
    };

    const inputStyle =
        "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none";

    const renderError = (name) =>
        touched[name] && errors[name] && (
            <p className="text-sm text-red-500 mt-1">{errors[name]}</p>
        );

    return (
        <div className="space-y-4 mt-6">
            {/* Card Number */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input
                    ref={cardRef}
                    name="cardNumber"
                    value={values.cardNumber}
                    onChange={handleCardInput}
                    onBlur={() => setFieldTouched("cardNumber", true, false)}
                    className={inputStyle + " tracking-widest"}
                    placeholder="0000 0000 0000 0000"
                    inputMode="numeric"
                />
                {renderError("cardNumber")}
            </div>

            {/* Expiry / CVV / ZIP */}
            <div className="grid grid-cols-3 gap-4">
                {/* Expiry */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                    <select
                        ref={expiryRef}
                        name="expiry"
                        value={values.expiry}
                        onChange={handleExpiryChange}
                        onBlur={() => setFieldTouched("expiry", true, false)}
                        className={inputStyle}
                    >
                        <option value="">MM/YY</option>
                        {generateExpiryOptions().map((op) => (
                            <option key={op} value={op}>
                                {op}
                            </option>
                        ))}
                    </select>
                    {renderError("expiry")}
                </div>

                {/* CVV */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                        ref={cvvRef}
                        name="cvv"
                        type="password"
                        value={values.cvv}
                        onChange={handleCvvInput}
                        onBlur={() => setFieldTouched("cvv", true, false)}
                        className={inputStyle}
                        placeholder="123"
                        inputMode="numeric"
                    />
                    {renderError("cvv")}
                </div>

                {/* ZIP */}
                <TextField
                    ref={zipRef}
                    name="cardZip"
                    label="ZIP"
                    placeholder="ZIP"
                    inputMode="numeric"
                    maxLength={6}
                    onChange={handleZipChange}
                />
            </div>
        </div>
    );
}
