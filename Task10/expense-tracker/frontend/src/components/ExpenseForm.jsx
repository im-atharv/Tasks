import { useEffect, useState } from "react";

const defaultForm = {
  desc: "",
  amount: "",
  category: "Needs",
  date: "", // new field
};

const ExpenseForm = ({ onAdd, onUpdate, editableExpense, setEditableExpense }) => {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (editableExpense) {
      let isoDate = "";

      // Only try to convert if date exists and is in expected format
      if (
        typeof editableExpense.date === "string" &&
        editableExpense.date.includes("/")
      ) {
        const [day, month, year] = editableExpense.date.split("/");
        isoDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      } else if (
        typeof editableExpense.date === "string" &&
        editableExpense.date.includes("-")
      ) {
        // Already in ISO format
        isoDate = editableExpense.date;
      }

      setForm({
        desc: editableExpense.desc || "",
        amount: editableExpense.amount || "",
        category: editableExpense.category || "Needs",
        date: isoDate,
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

    // Convert date from ISO (YYYY-MM-DD) to DD/MM/YYYY for backend
    let formattedDate = "";
    if (form.date) {
      const [year, month, day] = form.date.split("-");
      formattedDate = `${day}/${month}/${year}`;
    }

    const payload = {
      desc: form.desc,
      amount: parseFloat(form.amount),
      category: form.category,
      date: formattedDate,
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
        <label className="block text-gray-700 font-semibold mb-1">Description</label>
        <input
          type="text"
          name="desc"
          value={form.desc}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="e.g. Groceries+Games"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">Amount (₹)</label>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          onWheel={(e) => e.target.blur()}
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
          <option value="Needs">Needs</option>
          <option value="Wants">Wants</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">Date</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
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
