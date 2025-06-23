// services/expenseService.js

import Expense from "../models/Expense.js";

// Fetch all expenses belonging to a specific user
export const getUserExpenses = async (userId) => {
  return await Expense.findAll({ where: { userId } });
};

// Create a new expense entry for the given user
// Combines userId with the incoming data
export const createUserExpense = async (data, userId) => {
  return await Expense.create({ ...data, userId });
};

// Update an existing expense for the user
// Returns the updated expense if successful, otherwise null
export const updateUserExpense = async (id, data, userId) => {
  const [updated] = await Expense.update(data, {
    where: { id, userId },
  });

  // Only fetch updated record if the update count is non-zero
  return updated ? await Expense.findByPk(id) : null;
};

// Delete a specific expense by its ID and userId
export const deleteUserExpense = async (id, userId) => {
  return await Expense.destroy({ where: { id, userId } });
};

// Delete all expenses for a specific user
export const deleteAllUserExpenses = async (userId) => {
  return await Expense.destroy({ where: { userId } });
};
