import express from "express";
import Expense from "../models/Expense.js";

const router = express.Router();

// Get all expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});

// Create a new expense
router.post("/", async (req, res) => {
  try {
    const { amount, desc, category } = req.body;
    const newExpense = new Expense({ amount, desc, category });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create expense" });
  }
});

// Update an existing expense
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, desc, category } = req.body;
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { amount, desc, category },
      { new: true }
    );
    if (!updatedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.json(updatedExpense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update expense" });
  }
});

// Delete an expense
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(id);
    if (!deletedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.status(204).json();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete expense" });
  }
});

export default router;
