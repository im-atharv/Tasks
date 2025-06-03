import { useEffect, useRef, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";
import DownloadButtons from "./components/DownloadButtons";

const API_URL = "http://localhost:4000/api/expenses";
const SALARY_API_URL = "http://localhost:4000/api/salary";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [salary, setSalary] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const expenseRefs = useRef({});

  // Fetch expenses and salary on mount
  useEffect(() => {
    fetchExpenses();
    fetchSalary();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      const normalized = data.map((exp) => ({
        ...exp,
        id: exp._id || exp.id, // convert _id to id
      }));

      setExpenses(normalized);
    } catch (err) {
      console.error("Error fetching expenses", err);
    }
  };

  const fetchSalary = async () => {
    try {
      const response = await fetch(SALARY_API_URL);
      if (!response.ok) throw new Error("Failed to fetch salary");
      const data = await response.json();
      setSalary({
        amount: parseFloat(data.amount) || 0,
        currency: data.currency || "USD",
      });
    } catch (err) {
      console.error("Error fetching salary", err);
      setSalary(null);
    }
  };

  const addExpense = async (expense) => {
    const currentDate = new Date().toLocaleDateString();
    const newExpense = { ...expense, date: currentDate };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExpense),
      });
      const savedExpense = await response.json();
      const normalized = { ...savedExpense, id: savedExpense._id || savedExpense.id };

      setExpenses((prev) => [...prev, normalized]);

      setTimeout(() => {
        const ref = expenseRefs.current[normalized.id];
        if (ref?.scrollIntoView) {
          ref.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);

      window.location.reload();

    } catch (err) {
      console.error("Error adding expense", err);
    }
  };

  const updateExpense = async (updated) => {
    if (!updated.id) {
      console.error("Cannot update expense: missing ID", updated);
      alert("Error: Trying to update an expense without ID.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${updated.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      const updatedData = await response.json();
      const normalized = { ...updatedData, id: updatedData._id || updatedData.id };

      setExpenses((prev) =>
        prev.map((exp) => (exp.id === normalized.id ? normalized : exp))
      );
      setEditingExpense(null);

      setTimeout(() => {
        const ref = expenseRefs.current[normalized.id];
        if (ref?.scrollIntoView) {
          ref.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } catch (err) {
      console.error("Error updating expense", err);
    }
  };

  const handleEdit = (expense) => {
    if (!expense?.id) {
      console.warn("Attempted to edit an expense with no ID:", expense);
      return;
    }
    setEditingExpense(expense);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

      if (response.ok) {
        // Filter out the deleted expense from the expenses list
        setExpenses((prevExpenses) =>
          prevExpenses.filter((expense) => expense.id !== id)
        );
      } else {
        console.error("Error deleting expense");
      }
    } catch (err) {
      console.error("Error deleting expense", err);
    }
  };

  const clearExpenses = async () => {
    if (confirm("Are you sure you want to clear all expenses?")) {
      try {
        await fetch(API_URL, { method: "DELETE" });
        setExpenses([]);
      } catch (err) {
        console.error("Error clearing expenses", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 to-blue-100 px-4 py-6 sm:py-10">
      <div className="w-full max-w-3xl mx-auto bg-white p-4 sm:p-6 rounded-2xl shadow-2xl space-y-6">
        <h1 className="text-2xl sm:text-4xl font-bold text-center text-indigo-600">
          Expense Tracker
        </h1>

        <ExpenseForm
          onAdd={addExpense}
          onUpdate={updateExpense}
          editingExpense={editingExpense}
          onFinishEditing={() => setEditingExpense(null)}
          refreshSalary={fetchSalary}
        />

        <ExpenseList
          expenses={expenses}
          onEdit={handleEdit}
          expenseRefs={expenseRefs}
          currency={salary?.currency || "USD"}
          onDelete={handleDelete} // Pass the delete handler here
        />

        <Summary
          expenses={expenses}
          salary={salary?.amount || 0}
          currency={salary?.currency || "USD"}
        />

        <button
          onClick={clearExpenses}
          className="w-full mb-2 mt-2 sm:mt-4 bg-red-500 hover:bg-red-600 text-white text-sm sm:text-base p-2 sm:p-3 rounded-lg transition cursor-pointer"
        >
          Clear All Expenses
        </button>

        <DownloadButtons />
      </div>
    </div>
  );
}

export default App;
