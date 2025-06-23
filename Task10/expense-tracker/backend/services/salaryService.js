// services/salaryService.js

import Salary from "../models/SalaryModel.js";

/**
 * Fetches salary data for a given user
 * - If no record is found, returns null and logs a message
 * - Wraps Sequelize call in try-catch to handle DB errors
 */
export const getUserSalary = async (userId) => {
  try {
    const salary = await Salary.findOne({ where: { userId } });
    if (!salary) console.log("ℹ️ No salary record found");
    return salary;
  } catch (err) {
    console.error("❌ Sequelize error in getUserSalary:", err);
    throw err; // Re-throw to be handled by controller
  }
};

/**
 * Creates or updates salary data for a user
 * - If no record exists, creates one
 * - If record exists, updates the amount (and currency if provided)
 * - Handles all operations inside a try-catch block for stability
 */
export const upsertUserSalary = async (data, userId) => {
  const { amount, currency } = data;

  try {
    // Check if salary record already exists for the user
    let salary = await Salary.findOne({ where: { userId } });

    if (!salary) {
      // Create new salary entry
      salary = await Salary.create({ amount, currency, userId });
    } else {
      // Update existing salary entry
      salary.amount = amount;
      if (currency) salary.currency = currency;
      await salary.save();
    }

    return salary;
  } catch (err) {
    console.error("❌ Error in upsertUserSalary:", err);
    throw err;
  }
};
