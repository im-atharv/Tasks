import { Salary } from "../models/index.js"; // Dynamically import based on DB type


// Get current salary (single record)
export const getSalary = async (req, res) => {
  try {
    const salary = await Salary.findOne();
    if (!salary) return res.status(404).json({ message: "Salary not found" });
    res.json(salary);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch salary" });
  }
};

// Create or update salary (upsert)
export const createOrUpdateSalary = async (req, res) => {
  const { amount, currency } = req.body;
  try {
    let salary = await Salary.findOne();
    if (salary) {
      salary.amount = amount;
      salary.currency = currency;
      await salary.save();
      res.json(salary);
    } else {
      salary = new Salary({ amount, currency });
      await salary.save();
      res.status(201).json(salary);
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to save salary" });
  }
};
