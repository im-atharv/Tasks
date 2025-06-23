// controllers/expenseController.js

// Import service functions (business logic)
import {
  getUserExpenses,
  createUserExpense,
  updateUserExpense,
  deleteUserExpense,
  deleteAllUserExpenses,
} from "../services/expenseService.js";

// Import standardized success and error response handlers
import { sendSuccess, sendError } from "../utils/helpers/responseHelpers.js";

/**
 * GET /api/expenses
 * Fetches all expenses belonging to the authenticated user.
 */
export const getExpenses = async (req, res) => {
  try {
    const expenses = await getUserExpenses(req.userId); // req.userId is injected by JWT middleware
    sendSuccess(res, expenses);
  } catch (err) {
    sendError(res, "Failed to fetch expenses");
  }
};

/**
 * POST /api/expenses
 * Creates a new expense for the authenticated user.
 */
export const createExpense = async (req, res) => {
  try {
    const newExpense = await createUserExpense(req.body, req.userId);
    sendSuccess(res, newExpense, 201); // 201 = Created
  } catch (err) {
    sendError(res, "Failed to create expense");
  }
};

/**
 * PUT /api/expenses/:id
 * Updates a specific expense (by ID) for the authenticated user.
 */
export const updateExpense = async (req, res) => {
  try {
    const updatedExpense = await updateUserExpense(req.params.id, req.body, req.userId);
    if (!updatedExpense) return sendError(res, "Expense not found", 404);
    sendSuccess(res, updatedExpense);
  } catch (err) {
    sendError(res, "Failed to update expense");
  }
};

/**
 * DELETE /api/expenses/:id
 * Deletes a specific expense (by ID) for the authenticated user.
 */
export const deleteExpense = async (req, res) => {
  try {
    const deleted = await deleteUserExpense(req.params.id, req.userId);
    if (!deleted) return sendError(res, "Expense not found", 404);
    sendSuccess(res, null, 204); // 204 = No Content
  } catch (err) {
    sendError(res, "Failed to delete expense");
  }
};

/**
 * DELETE /api/expenses
 * Deletes all expenses for the authenticated user.
 */
export const deleteAllExpenses = async (req, res) => {
  try {
    const count = await deleteAllUserExpenses(req.userId);
    if (count === 0) return sendError(res, "No expenses to delete", 404);
    sendSuccess(res, null, 204); // Success with no content
  } catch (err) {
    sendError(res, "Failed to delete all expenses");
  }
};
