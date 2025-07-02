import { useEffect, useState } from "react";
import axios from "axios";
import {
    COUNTRY_CODE_MAP,
    PINCODE_API,
    ZIPPOPOTAM_API,
} from "../constants/addressConstants";

export default function Address({ formik }) {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const { values, setFieldValue, touched, errors } = formik;
    const baseClass = "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none";

    // ✅ Fetch countries (initial load)
    useEffect(() => {
        axios
            .get("https://countriesnow.space/api/v0.1/countries/positions")
            .then((res) => setCountries(res.data.data.map((c) => c.name)))
            .catch((err) => console.error("Error fetching countries", err));
    }, []);

    // ✅ Fetch states when country changes
    useEffect(() => {
        if (values.country) {
            axios
                .post("https://countriesnow.space/api/v0.1/countries/states", {
                    country: values.country,
                })
                .then((res) => {
                    setStates(res.data.data.states.map((s) => s.name));
                    setFieldValue("state", "");
                    setFieldValue("city", "");
                    setCities([]);
                })
                .catch((err) => console.error("Error fetching states", err));
        } else {
            setStates([]);
            setCities([]);
        }
    }, [values.country]);

    // ✅ Fetch cities when state changes
    useEffect(() => {
        if (values.state) {
            axios
                .post("https://countriesnow.space/api/v0.1/countries/state/cities", {
                    country: values.country,
                    state: values.state,
                })
                .then((res) => {
                    setCities(res.data.data);
                    setFieldValue("city", "");
                })
                .catch((err) => console.error("Error fetching cities", err));
        } else {
            setCities([]);
        }
    }, [values.state]);

    // ✅ Validate ZIP Code dynamically
    useEffect(() => {
        const validateZip = async () => {
            const zip = values.addressZip?.trim();

            if (!zip || zip.length < 4) return;

            // 🇮🇳 India PIN Validation
            if (values.country === "India" && /^\d{6}$/.test(zip)) {
                try {
                    const res = await axios.get(`${PINCODE_API}${zip}`);
                    const postOffices = res.data?.[0]?.PostOffice;

                    if (!postOffices?.length) {
                        formik.setFieldError("addressZip", "Invalid PIN code.");
                        return;
                    }

                    const match = postOffices.some(
                        (p) =>
                            p.District.toLowerCase() === values.city?.toLowerCase() &&
                            p.State.toLowerCase() === values.state?.toLowerCase()
                    );

                    if (!match) {
                        formik.setFieldError("addressZip", "PIN doesn't match selected city/state.");
                    }
                } catch (err) {
                    console.error("PIN validation failed:", err);
                    formik.setFieldError("addressZip", "Unable to verify PIN.");
                }
            }

            // 🌍 International ZIP validation
            else {
                const countryCode = COUNTRY_CODE_MAP[values.country];
                if (!countryCode) return;

                try {
                    const res = await axios.get(`${ZIPPOPOTAM_API}/${countryCode}/${zip}`);
                    const places = res.data?.places || [];

                    const matched = places.some(
                        (p) => p["place name"]?.toLowerCase() === values.city?.toLowerCase()
                    );

                    if (!matched) {
                        formik.setFieldError("addressZip", "ZIP doesn't match selected city.");
                    }
                } catch (err) {
                    console.warn("ZIP validation failed:", err);
                    formik.setFieldError("addressZip", "Invalid ZIP for selected country.");
                }
            }
        };

        validateZip();
    }, [values.addressZip, values.city, values.state, values.country]);

    const renderSelect = ({ label, name, options, disabled = false }) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
                <span className="text-red-500"> *</span>
            </label>
            <select
                name={name}
                value={values[name]}
                onChange={(e) => setFieldValue(name, e.target.value)}
                className={baseClass}
                disabled={disabled}
            >
                <option value="">Select {label.toLowerCase()}</option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
            {touched[name] && errors[name] && (
                <p className="text-sm text-red-500 mt-1">{errors[name]}</p>
            )}
        </div>
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {renderSelect({ label: "Country", name: "country", options: countries })}
            {renderSelect({ label: "State", name: "state", options: states, disabled: !states.length })}
            {renderSelect({ label: "City", name: "city", options: cities, disabled: !cities.length })}
        </div>
    );
}
