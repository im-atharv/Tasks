import React from "react";

export default function DownloadButtons() {
  // Helper to get expenses from localStorage safely
  const getExpenses = () => {
    try {
      const expenses = localStorage.getItem("expenses-v1");
      return expenses ? JSON.parse(expenses) : [];
    } catch (error) {
      console.error("Failed to parse expenses from localStorage:", error);
      return [];
    }
  }

  const getSalary = () => {
    return parseFloat(localStorage.getItem("monthly-salary") || "0");
  };

  const calculateSummary = (expenses, salary) => {
    const needs = expenses.filter(e => e.category === "Needs").reduce((sum, e) => sum + e.amount, 0);
    const wants = expenses.filter(e => e.category === "Wants").reduce((sum, e) => sum + e.amount, 0);
    const savings = salary - needs - wants;

    return {
      needs,
      wants,
      savings,
      total: needs + wants,
      remaining: savings,
      salary
    };
  }

  const downloadFile = async (url, filename) => {
    const expenses = getExpenses();
    const salary = getSalary();
    const summary = calculateSummary(expenses, salary);

    if (!expenses.length) {
      alert("No expenses found to export!");
      return;
    }

    console.log(`[Frontend] Sending export request to ${url} with ${expenses.length} items`);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expenses, summary }),
      });

      if (!response.ok) {
        alert(`Failed to export ${filename}`);
        return;
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);

      console.log(`[Frontend] Download of ${filename} started.`);
    } catch (error) {
      alert("Error exporting file: " + error.message);
      console.error("Download error:", error);
    }
  };

  return (
    <div className="flex gap-4 justify-center mt-6 mb-12">
      <button
        onClick={() => downloadFile("http://localhost:4000/api/export/excel", "expenses.xlsx")}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Download Excel
      </button>
      <button
        onClick={() => downloadFile("http://localhost:4000/api/export/pdf", "expenses.pdf")}
        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Download PDF
      </button>
    </div>
  );
}
