import { useState, useEffect } from "react";

const SalaryBlock = ({ salary, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!salary) {
      setEditing(true);
      setValue("");
    } else {
      setEditing(false);
      setValue(salary.amount || "");
    }
  }, [salary]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(Number(value));
    setEditing(false);
  };

  return (
    <div className="bg-white/90 backdrop-blur shadow-md border border-gray-200 rounded-2xl p-6 transition">
      {editing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-gray-700 font-medium text-sm">Enter Salary</label>
          <input
            type="number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
            min={0}
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-lg transition"
          >
            Save
          </button>
        </form>
      ) : salary ? (
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold text-gray-800">
            Salary: ₹{salary.amount.toLocaleString("en-IN")}
          </p>
          <button
            className="text-indigo-600 hover:text-indigo-800 font-medium text-sm underline transition"
            onClick={() => setEditing(true)}
          >
            Edit
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default SalaryBlock;
