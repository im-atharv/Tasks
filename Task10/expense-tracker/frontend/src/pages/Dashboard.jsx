// src/pages/Dashboard.jsx
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import SalaryBlock from "../components/SalaryBlock";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import DownloadButtons from "../components/DownloadButtons";
import { getSalary, updateSalary } from "../api/salary";
import {
  fetchExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
} from "../api/expense";
import Summary from "../components/Summary";
import { getSummaryFromExpenses } from "../utils/summary";

const Dashboard = () => {
  const { user } = useAuth();
  const [salary, setSalary] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [editableExpense, setEditableExpense] = useState(null);
  const formRef = useRef(null); // ✅ For scrolling to form
  const expenseRefs = useRef({}); // ✅ For scrolling to expense list item

  // Fetch salary and expenses
  useEffect(() => {
    const fetchData = async () => {
      try {
        const sal = await getSalary();
        setSalary(sal);
        const allExpenses = await fetchExpenses();
        setExpenses(allExpenses);
      } catch (err) {
        console.error("Failed to load data", err);
      }
    };

    fetchData();
  }, []);

  // Handle save salary
  const handleSaveSalary = async (value) => {
    try {
      const updated = await updateSalary(value);
      setSalary(updated);
    } catch (err) {
      console.error("Failed to set salary", err);
    }
  };

  // Handle add
  const handleAddExpense = async (expense) => {
    try {
      const newExp = await addExpense(expense);
      setExpenses((prev) => [...prev, newExp]);
    } catch (err) {
      console.error("Failed to add expense", err);
    }
  };

  // Handle update
  const handleUpdateExpense = async (updatedExpense) => {
    try {
      const updated = await updateExpense(
        updatedExpense.id || updatedExpense._id,
        updatedExpense
      );
      setExpenses((prev) =>
        prev.map((e) =>
          (e.id || e._id) === (updated.id || updated._id) ? updated : e
        )
      );
      setEditableExpense(null);

      // ✅ Scroll back to updated item
      setTimeout(() => {
        const key = updated.id || updated._id;
        if (expenseRefs.current[key]) {
          expenseRefs.current[key].scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    } catch (err) {
      console.error("Failed to update expense", err);
    }
  };

  // Handle delete
  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses((prev) => prev.filter((e) => (e.id || e._id) !== id));
    } catch (err) {
      console.error("Failed to delete expense", err);
    }
  };

  // Start editing (scroll to form)
  const handleStartEditExpense = (expense) => {
    setEditableExpense(expense);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const summary = getSummaryFromExpenses(salary?.amount || 0, expenses);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-50 to-blue-100 p-4 md:p-6">
      <Header name={user?.name} />

      <main className="max-w-4xl mx-auto grid gap-6 mt-6">
        <section className="bg-white shadow-md rounded-2xl p-6">
          <SalaryBlock salary={salary} onSave={handleSaveSalary} />
        </section>

        <section ref={formRef} className="bg-white shadow-md rounded-2xl p-6">
          <ExpenseForm
            onAdd={handleAddExpense}
            onUpdate={handleUpdateExpense}
            editableExpense={editableExpense}
            setEditableExpense={setEditableExpense}
          />
        </section>

        <section className="bg-white shadow-md rounded-2xl p-6">
          <ExpenseList
            expenses={expenses}
            onDelete={handleDeleteExpense}
            onEdit={handleStartEditExpense}
            expenseRefs={expenseRefs} // ✅ pass refs
          />
        </section>

        <section className="bg-white shadow-md rounded-2xl p-6">
          <Summary salary={salary} expenses={expenses} />
        </section>

        <section className="flex justify-center bg-white shadow-md rounded-2xl p-6">
          <DownloadButtons summary={summary} expenses={expenses} />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
