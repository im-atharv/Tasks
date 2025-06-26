import { useFormikContext } from "formik";
import { useEffect, useState, useCallback } from "react";
import {
    DATA_USAGE_OPTIONS,
    TECH_DATA_AVAILABILITY,
    PRICING_MAP,
    RADIO_TECH_OPTIONS,
} from "../constants/radioTechOptions";

export default function PlanSelector() {
    const { values, setFieldValue } = useFormikContext();
    const selectedTech = values.radioTech || ""; // ✅ now a string

    const [allowedUsages, setAllowedUsages] = useState([]);
    const [price, setPrice] = useState(0);

    // 🔁 Recalculate allowed usages and price on tech change
    useEffect(() => {
        const allowed = TECH_DATA_AVAILABILITY[selectedTech] || [];
        setAllowedUsages(allowed);

        const validSelections = (values.dataUsage || []).filter((d) =>
            allowed.includes(d)
        );

        // Avoid unnecessary state updates
        if (JSON.stringify(validSelections) !== JSON.stringify(values.dataUsage)) {
            setFieldValue("dataUsage", validSelections);
        }

        const total = validSelections.reduce(
            (sum, usage) => sum + (PRICING_MAP[selectedTech]?.[usage] || 0),
            0
        );
        setPrice(total);
        setFieldValue("calculatedPrice", total);
    }, [selectedTech]);

    // 🔁 Recalculate total when data usage changes
    useEffect(() => {
        const validSelections = (values.dataUsage || []).filter((d) =>
            allowedUsages.includes(d)
        );

        const total = validSelections.reduce(
            (sum, usage) => sum + (PRICING_MAP[selectedTech]?.[usage] || 0),
            0
        );

        setPrice(total);
        setFieldValue("calculatedPrice", total);
    }, [values.dataUsage]);

    // ✅ Add or remove data usage selection
    const toggleUsage = useCallback(
        (option) => {
            const current = values.dataUsage || [];
            const updated = current.includes(option)
                ? current.filter((item) => item !== option)
                : [...current, option];
            setFieldValue("dataUsage", updated);
        },
        [values.dataUsage]
    );

    return (
        <div className="space-y-4">
            {/* 🟣 Network Type */}
            <div>
                <label className="block font-medium mb-1">Select Network</label>
                <div className="flex gap-4 flex-wrap">
                    {RADIO_TECH_OPTIONS.map((tech) => (
                        <label key={tech} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="radioTech"
                                value={tech}
                                checked={selectedTech === tech}
                                onChange={() => setFieldValue("radioTech", tech)}
                                className="accent-indigo-600"
                            />
                            {tech}
                        </label>
                    ))}
                </div>
            </div>

            {/* 📶 Data Usage */}
            <div>
                <label className="block font-medium mb-1">Select Data Usage</label>
                <div className="grid grid-cols-2 gap-2">
                    {DATA_USAGE_OPTIONS.map((opt) => {
                        const isAllowed = allowedUsages.includes(opt);
                        const isChecked = values.dataUsage?.includes(opt);
                        return (
                            <label
                                key={opt}
                                className={`flex items-center gap-2 rounded p-2 cursor-pointer border transition ${isAllowed
                                        ? "bg-white hover:bg-gray-50"
                                        : "bg-gray-100 cursor-not-allowed"
                                    }`}
                            >
                                <input
                                    type="checkbox"
                                    name="dataUsage"
                                    value={opt}
                                    disabled={!isAllowed}
                                    checked={isChecked}
                                    onChange={() => toggleUsage(opt)}
                                    className="accent-indigo-600"
                                />
                                {opt}
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* 💰 Total Price */}
            <div className="text-lg font-semibold text-green-700">
                Total Price: ₹{price}
            </div>
        </div>
    );
}
