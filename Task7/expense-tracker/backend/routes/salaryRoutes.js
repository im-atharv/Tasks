import express from 'express';
import Salary from '../models/SalaryModel.js';

const router = express.Router();

// GET current salary
router.get('/', async (req, res) => {
  try {
    const salary = await Salary.findOne();
    if (!salary) return res.status(404).json({ message: 'No salary data found' });
    res.json(salary);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST create or update salary (upsert)
router.post('/', async (req, res) => {
  const { amount, currency } = req.body;
  if (amount === undefined) return res.status(400).json({ message: 'Amount is required' });

  try {
    const [salary, created] = await Salary.findOrCreate({
      where: {},
      defaults: { amount, currency },
    });

    if (!created) {
      salary.amount = amount;
      if (currency) salary.currency = currency;
      await salary.save();
    }

    res.json(salary);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save salary' });
  }
});

// PUT update salary by ID
router.put('/:id', async (req, res) => {
  const { amount, currency } = req.body;
  if (amount === undefined) return res.status(400).json({ message: 'Amount is required' });

  try {
    const salary = await Salary.findByPk(req.params.id);
    if (!salary) return res.status(404).json({ message: 'Salary not found' });

    salary.amount = amount;
    if (currency) salary.currency = currency;
    await salary.save();
    res.json(salary);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update salary' });
  }
});

export default router;
