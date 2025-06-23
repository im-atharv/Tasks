import axios from "./axiosInstance";

// Fetch all expenses
export const fetchExpenses = async () => {
  const res = await axios.get("/expenses");
  return res.data.data;
};

// Add a new expense
export const addExpense = async (expense) => {
  const res = await axios.post("/expenses", expense);
  return res.data.data;
};

// Update an existing expense ✅
export const updateExpense = async (id, updatedData) => {
  const res = await axios.put(`/expenses/${id}`, updatedData);
  return res.data.data;
};

// Delete expense ✅
export const deleteExpense = async (id) => {
  const res = await axios.delete(`/expenses/${id}`);
  return res.data.message;
};
