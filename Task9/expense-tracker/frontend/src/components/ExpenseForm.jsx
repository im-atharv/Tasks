// src/components/ExpenseForm.jsx
import { useEffect, useState } from "react";

const defaultForm = {
  title: "",
  amount: "",
  category: "needs",
};

const ExpenseForm = ({ onAdd, onUpdate, editableExpense, setEditableExpense }) => {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (editableExpense) {
      setForm({
        title: editableExpense.title || "",
        amount: editableExpense.amount || "",
        category: editableExpense.category || "needs",
      });
    } else {
      setForm(defaultForm);
    }
  }, [editableExpense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      amount: parseFloat(form.amount),
    };

    if (editableExpense) {
      onUpdate({ ...editableExpense, ...payload });
    } else {
      onAdd(payload);
    }

    setForm(defaultForm);
    setEditableExpense(null);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="e.g. Groceries"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">Amount (₹)</label>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="e.g. 1200"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="needs">Needs</option>
          <option value="wants">Wants</option>
          <option value="savings">Savings</option>
        </select>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl transition"
        >
          {editableExpense ? "Update Expense" : "Add Expense"}
        </button>

        {editableExpense && (
          <button
            type="button"
            onClick={() => {
              setEditableExpense(null);
              setForm(defaultForm);
            }}
            className="text-gray-500 hover:text-gray-700 text-sm underline transition"
          >
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  );
};

export default ExpenseForm;
