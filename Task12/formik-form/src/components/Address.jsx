import { useEffect, useState } from "react";
import axios from "axios";

export default function Address({ formik }) {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const { values, setFieldValue, touched, errors } = formik;
    const baseClass = "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none";

    // Fetch countries on mount
    useEffect(() => {
        axios
            .get("https://countriesnow.space/api/v0.1/countries/positions")
            .then((res) => setCountries(res.data.data.map((c) => c.name)))
            .catch((err) => console.error("Error fetching countries", err));
    }, []);

    // Fetch states when country changes
    useEffect(() => {
        if (values.country) {
            axios
                .post("https://countriesnow.space/api/v0.1/countries/states", {
                    country: values.country,
                })
                .then((res) => {
                    setStates(res.data.data.states.map((s) => s.name));
                    setFieldValue("state", ""); // reset state
                    setFieldValue("city", "");  // reset city
                    setCities([]);
                })
                .catch((err) => console.error("Error fetching states", err));
        } else {
            setStates([]);
            setCities([]);
        }
    }, [values.country]);

    // Fetch cities when state changes
    useEffect(() => {
        if (values.state) {
            axios
                .post("https://countriesnow.space/api/v0.1/countries/state/cities", {
                    country: values.country,
                    state: values.state,
                })
                .then((res) => {
                    setCities(res.data.data);
                    setFieldValue("city", ""); // reset city
                })
                .catch((err) => console.error("Error fetching cities", err));
        } else {
            setCities([]);
        }
    }, [values.state]);

    // Render a dropdown field
    const renderSelect = ({ label, name, options, disabled = false }) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <select
                name={name}
                value={values[name]}
                onChange={(e) => {
                    setFieldValue(name, e.target.value);
                }}
                className={baseClass}
                disabled={disabled}
            >
                <option value="">Select {label.toLowerCase()}</option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
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
