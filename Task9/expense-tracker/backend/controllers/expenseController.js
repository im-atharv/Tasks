import {
  getUserExpenses,
  createUserExpense,
  updateUserExpense,
  deleteUserExpense,
  deleteAllUserExpenses,
} from "../services/expenseService.js";
import { sendSuccess, sendError } from "../utils/helpers/responseHelpers.js";

export const getExpenses = async (req, res) => {
  try {
    const expenses = await getUserExpenses(req.userId);
    sendSuccess(res, expenses);
  } catch (err) {
    sendError(res, "Failed to fetch expenses");
  }
};

export const createExpense = async (req, res) => {
  try {
    const newExpense = await createUserExpense(req.body, req.userId);
    sendSuccess(res, newExpense, 201);
  } catch (err) {
    sendError(res, "Failed to create expense");
  }
};

export const updateExpense = async (req, res) => {
  try {
    const updatedExpense = await updateUserExpense(req.params.id, req.body, req.userId);
    if (!updatedExpense) return sendError(res, "Expense not found", 404);
    sendSuccess(res, updatedExpense);
  } catch (err) {
    sendError(res, "Failed to update expense");
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const deleted = await deleteUserExpense(req.params.id, req.userId);
    if (!deleted) return sendError(res, "Expense not found", 404);
    sendSuccess(res, null, 204);
  } catch (err) {
    sendError(res, "Failed to delete expense");
  }
};

export const deleteAllExpenses = async (req, res) => {
  try {
    const count = await deleteAllUserExpenses(req.userId);
    if (count === 0) return sendError(res, "No expenses to delete", 404);
    sendSuccess(res, null, 204);
  } catch (err) {
    sendError(res, "Failed to delete all expenses");
  }
};
