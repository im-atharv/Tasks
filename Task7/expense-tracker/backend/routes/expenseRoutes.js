import express from 'express';
import Expense from '../models/Expense.js';

const router = express.Router();

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

// Create a new expense
router.post('/', async (req, res) => {
  try {
    const { amount, desc, category } = req.body;
    const newExpense = await Expense.create({ amount, desc, category });
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create expense' });
  }
});

// Update an existing expense
router.put('/:id', async (req, res) => {
  try {
    const { amount, desc, category } = req.body;
    const [updated] = await Expense.update({ amount, desc, category }, {
      where: { id: req.params.id },
    });
    if (!updated) return res.status(404).json({ error: 'Expense not found' });
    const updatedExpense = await Expense.findByPk(req.params.id);
    res.json(updatedExpense);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update expense' });
  }
});

// Delete an expense
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Expense.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Expense not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});

// Delete all expenses
router.delete('/', async (req, res) => {
  try {
    // Delete all expenses
    const deletedCount = await Expense.destroy({ where: {} });
    if (deletedCount === 0) {
      return res.status(404).json({ error: 'No expenses to delete' });
    }

    // Reset the sequence for the id field to 1 (or the next available value)
    await Expense.sequelize.query('ALTER SEQUENCE "Expenses_id_seq" RESTART WITH 1');

    res.status(204).send(); // No content, successfully deleted all expenses
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete all expenses' });
  }
});


export default router;
