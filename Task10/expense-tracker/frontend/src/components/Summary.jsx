import React from "react";

const Summary = ({ salary, expenses }) => {
  if (!salary || salary <= 0) return null;

  const salaryAmount = salary.amount;
  const needs = expenses
    .filter((e) => e.category === "Needs")
    .reduce((sum, e) => sum + e.amount, 0);

  const wants = expenses
    .filter((e) => e.category === "Wants")
    .reduce((sum, e) => sum + e.amount, 0);

  const savings = Math.max(salaryAmount - (needs + wants), 0);

  const summaryData = [
    { label: "Salary", value: salaryAmount, color: "bg-blue-100 text-blue-800" },
    { label: "Needs", value: needs, color: "bg-red-100 text-red-800" },
    { label: "Wants", value: wants, color: "bg-yellow-100 text-yellow-800" },
    { label: "Savings", value: savings, color: "bg-green-100 text-green-800" },
  ];

  return (
    <div className="mt-6 p-6 rounded-2xl shadow bg-white/90 backdrop-blur border border-gray-200">
      <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">📊 Summary</h3>

      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
        {summaryData.map(({ label, value, color }) => (
          <div
            key={label}
            className={`rounded-xl p-4 shadow-sm ${color} flex flex-col items-center`}
          >
            <p className="text-sm font-medium">{label}</p>
            <p className="text-xl font-bold tracking-wide">
              ₹{value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Summary;
