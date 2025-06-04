// backend/controllers/expenseController.js

import { Expense } from "../models/index.js"; // Dynamically import based on DB type
import mongoose from 'mongoose';

const isMongoDB = process.env.DATABASE_TYPE === 'mongo';

const createExpense = async (req, res) => {
  try {
    if (isMongoDB) {
      // MongoDB controller - Use dynamic import
      const { createExpense: createMongoExpense } = await import("./mongodb/expenseController.js");
      return createMongoExpense(req, res);
    } else {
      // Postgres controller - Use dynamic import
      const { createExpense: createPostgresExpense } = await import("./postgresql/expenseController.js");
      return createPostgresExpense(req, res);
    }
  } catch (err) {
    console.error("Error selecting DB controller:", err);
    res.status(500).json({ error: "Failed to handle expense creation" });
  }
};

const getAllExpenses = async (req, res) => {
  try {
    if (isMongoDB) {
      // MongoDB controller - Use dynamic import
      const { getAllExpenses: getAllMongoExpenses } = await import("./mongodb/expenseController.js");
      return getAllMongoExpenses(req, res);
    } else {
      // Postgres controller - Use dynamic import
      const { getAllExpenses: getAllPostgresExpenses } = await import("./postgresql/expenseController.js");
      return getAllPostgresExpenses(req, res);
    }
  } catch (err) {
    console.error("Error selecting DB controller:", err);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};

const updateExpense = async (req, res) => {
  try {
    if (isMongoDB) {
      // MongoDB controller - Use dynamic import
      const { updateExpense: updateMongoExpense } = await import("./mongodb/expenseController.js");
      return updateMongoExpense(req, res);
    } else {
      // Postgres controller - Use dynamic import
      const { updateExpense: updatePostgresExpense } = await import("./postgresql/expenseController.js");
      return updatePostgresExpense(req, res);
    }
  } catch (err) {
    console.error("Error selecting DB controller:", err);
    res.status(500).json({ error: "Failed to update expense" });
  }
};

const deleteExpense = async (req, res) => {
  try {
    if (isMongoDB) {
      // MongoDB controller - Use dynamic import
      const { deleteExpense: deleteMongoExpense } = await import("./mongodb/expenseController.js");
      return deleteMongoExpense(req, res);
    } else {
      // Postgres controller - Use dynamic import
      const { deleteExpense: deletePostgresExpense } = await import("./postgresql/expenseController.js");
      return deletePostgresExpense(req, res);
    }
  } catch (err) {
    console.error("Error selecting DB controller:", err);
    res.status(500).json({ error: "Failed to delete expense" });
  }
};

export { createExpense, getAllExpenses, updateExpense, deleteExpense };
