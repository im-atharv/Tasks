import React, { useEffect, useState } from "react";

export default function DownloadButtons() {
  const [expenses, setExpenses] = useState([]);
  const [salary, setSalary] = useState(0);

  // Fetch expenses and salary from the server on mount
  useEffect(() => {
    const fetchExpensesAndSalary = async () => {
      try {
        const expensesResponse = await fetch("http://localhost:4000/api/expenses");
        const expensesData = await expensesResponse.json();
        setExpenses(expensesData);

        const salaryResponse = await fetch("http://localhost:4000/api/salary");
        const salaryData = await salaryResponse.json();
        setSalary(parseFloat(salaryData.amount) || 0); // Default to 0 if no salary set
      } catch (error) {
        console.error("Error fetching expenses or salary:", error);
      }
    };

    fetchExpensesAndSalary();
  }, []);

  // Calculate summary of expenses
  const calculateSummary = (expenses, salary) => {
    const needs = expenses.filter((e) => e.category === "Needs").reduce((sum, e) => sum + e.amount, 0);
    const wants = expenses.filter((e) => e.category === "Wants").reduce((sum, e) => sum + e.amount, 0);
    const savings = Math.max(0, salary - needs - wants);

    return {
      needs,
      wants,
      savings,
      total: needs + wants,
      remaining: savings,
      salary,
    };
  };

  // Function to download the file which takes the url and filename
  const downloadFile = async (type, filename) => {
    if (!expenses.length) {
      alert("No expenses found to export!");
      return;
    }

    const summary = calculateSummary(expenses, salary);

    const url = `http://localhost:4000/api/export?type=${type}`;
    console.log(`[Frontend] Sending export request to ${url} with ${expenses.length} items`);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expenses, summary }),
      });

      console.log(`[Frontend] Response status: ${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("[Frontend] Response not OK:", errorText);
        alert(`Failed to export ${filename}: ${errorText}`);
        return;
      }

      const contentType = response.headers.get("Content-Type") || "";
      if (!contentType.includes("application/octet-stream") && !contentType.includes("application/pdf") && !contentType.includes("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
        const text = await response.text();
        console.error("[Frontend] Unexpected content type or content:", text);
        alert(`Unexpected response when exporting ${filename}`);
        return;
      }

      const blob = await response.blob();
      console.log("[Frontend] Blob size:", blob.size);

      if (blob.size === 0) {
        alert("Exported file is empty.");
        return;
      }

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
      console.error("[Frontend] Fetch error:", error);
      alert("Error exporting file: " + error.message);
    }
  };

  return (
    <>
      <div className="mt-5 text-2xl sm:text-3xl font-bold text-red-500 text-center">
        Generate Your Monthly Reports
      </div>
      <div className="flex gap-4 justify-center mt-6 mb-12">
        <button
          onClick={() => downloadFile("excel", "expenses.xlsx")}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Download Excel
        </button>
        <button
          onClick={() => downloadFile("pdf", "expenses.pdf")}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition cursor-pointer"
        >
          Download PDF
        </button>
      </div>
    </>
  );
}
