import React from "react";

export default function DownloadButtons() {
  // Helper to get expenses from localStorage safely
  const getExpenses = () => {
    //Used try catch block to get rid of any errors while fetching data from local storage.
    try {
      const expenses = localStorage.getItem("expenses-v1");
      return expenses ? JSON.parse(expenses) : [];  //Parse the json string to json object using JSON.parse
    } catch (error) {
      console.error("Failed to parse expenses from localStorage:", error);
      return [];
    }
  }

  // Helper to get salary from localStorage if not present(null) then zero
  const getSalary = () => {
    return parseFloat(localStorage.getItem("monthly-salary") || "0");
  }

  //
  const calculateSummary = (expenses, salary) => {
    //Filter category wise and sum up the fields with initial value to 0
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
    }
  }

  //Function to download the file which take the url and filename
  const downloadFile = async (type, filename) => {
    //Function call to get all the data
    const expenses = getExpenses();
    const salary = getSalary();
    const summary = calculateSummary(expenses, salary);

    //If there is no expenses then sends the alert and stops
    if (!expenses.length) {
      alert("No expenses found to export!");
      return;
    }

    //Construct the URL with the export type
    const url = `http://localhost:4000/api/export?type=${type}`;

    //Log message to show how many expense records has been sent and to which url
    console.log(`[Frontend] Sending export request to ${url} with ${expenses.length} items`);

    //Fetch request to server
    try {
      //Use fetch to send POST request to the backend API
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" }, //Set headers to indicate JSON data
        body: JSON.stringify({ expenses, summary }), //Send both expenses and summary objects as JSON body
      });

      //If response is not ok then sends the alert and stops
      if (!response.ok) {
        alert(`Failed to export ${filename}`);
        return;
      }

      //Converts the response into Blob (Binary large object)
      const blob = await response.blob();
      //Create a temporary URL for the blob so the browser can download it.
      const downloadUrl = window.URL.createObjectURL(blob);

      //Creates an anchor element in the DOM
      const a = document.createElement("a");
      //Sets the anchor's href to the blob url
      a.href = downloadUrl;
      //Sets the download attribute to specify the filename to be downloaded
      a.download = filename;
      //Add the anchor to the page, simulate a click to start download, and then remove it.
      document.body.appendChild(a);
      a.click();
      a.remove();
      //Clean up the temporary blob URL to free memory.
      window.URL.revokeObjectURL(downloadUrl);

      console.log(`[Frontend] Download of ${filename} started.`);
    } catch (error) {
      alert("Error exporting file: " + error.message);
      console.error("Download error:", error);
    }
  };

  return (
    <>
      <div className="mt-5 text-2xl sm:text-3xl font-bold text-red-500 text-center text-">Generate Your Monthly Reports</div>
      <div className="flex gap-4 justify-center mt-6 mb-12">
        <button
          //Sends data to /api/export?type=excel
          onClick={() => downloadFile("excel", "expenses.xlsx")}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Download Excel
        </button>
        <button
          //Sends data to /api/export?type=pdf
          onClick={() => downloadFile("pdf", "expenses.pdf")}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition cursor-pointer"
        >
          Download PDF
        </button>
      </div>
    </>
  );
}
