// routes/expenseRoutes.js

import express from "express";
import { getExpenses, createExpense, updateExpense, deleteExpense, deleteAllExpenses } from "../controllers/expenseController.js";
import requireAuth from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Expense Routes (All protected)
 *
 * These routes handle CRUD operations for user expenses:
 * - GET    /         → Get all expenses for the logged-in user
 * - POST   /         → Create a new expense
 * - PUT    /:id      → Update an existing expense by ID
 * - DELETE /:id      → Delete a specific expense by ID
 * - DELETE /         → Delete all expenses for the user
 */

// Get all user expenses
router.get("/", requireAuth, getExpenses);

// Create a new expense
router.post("/", requireAuth, createExpense);

// Update an expense by ID
router.put("/:id", requireAuth, updateExpense);

// Delete an expense by ID
router.delete("/:id", requireAuth, deleteExpense);

// Delete all expenses (bulk delete)
router.delete("/", requireAuth, deleteAllExpenses);

export default router;
