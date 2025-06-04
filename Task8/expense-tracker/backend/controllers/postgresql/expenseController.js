// backend/controllers/postgresql/expenseController.js
import Expense from '../../models/Postgresql/Expense.js'; // Sequelize model

const createExpense = async (req, res) => {
  try {
    const { amount, desc, category } = req.body;
    await Expense.create({ amount, desc, category });
    const sortedExpenses = await Expense.findAll({ order: [['id', 'ASC']] });
    res.status(201).json(sortedExpenses);
  } catch (err) {
    console.error("Error creating expense:", err);
    res.status(500).json({ error: "Failed to create expense" });
  }
};


const getAllExpenses = async (req, res) => {
  try {
    const sortedExpenses = await Expense.findAll({ order: [['id', 'ASC']] });
    res.json(sortedExpenses);
  } catch (err) {
    console.error("Error fetching expenses:", err);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { amount, desc, category } = req.body;
    const expenseId = req.params.id;

    const [updatedRowCount] = await Expense.update(
      { amount, desc, category },
      { where: { id: expenseId } }
    );

    if (!updatedRowCount) {
      return res.status(404).json({ error: "Expense not found" });
    }
    const sortedExpenses = await Expense.findAll({ order: [['id', 'ASC']] });
    res.json(sortedExpenses);
  } catch (err) {
    console.error("Error updating expense:", err);
    res.status(500).json({ error: "Failed to update expense" });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const deletedCount = await Expense.destroy({ where: { id: expenseId } });

    if (!deletedCount) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.status(204).send();
  } catch (err) {
    console.error("Error deleting expense:", err);
    res.status(500).json({ error: "Failed to delete expense" });
  }
};

export { createExpense, getAllExpenses, updateExpense, deleteExpense };
