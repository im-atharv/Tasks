// services/expenseService.js
import Expense from "../models/Expense.js";

export const getUserExpenses = async (userId) => {
  return await Expense.findAll({ where: { userId } });
};

export const createUserExpense = async (data, userId) => {
  return await Expense.create({ ...data, userId });
};

export const updateUserExpense = async (id, data, userId) => {
  const [updated] = await Expense.update(data, {
    where: { id, userId },
  });
  return updated ? await Expense.findByPk(id) : null;
};

export const deleteUserExpense = async (id, userId) => {
  return await Expense.destroy({ where: { id, userId } });
};

export const deleteAllUserExpenses = async (userId) => {
  return await Expense.destroy({ where: { userId } });
};
