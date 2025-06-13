import Salary from "../models/SalaryModel.js";

export const getUserSalary = async (userId) => {
  try {
    console.log("👀 Fetching salary for userId:", userId); // ✅
    const salary = await Salary.findOne({ where: { userId } });
    if (!salary) console.log("ℹ️ No salary record found");
    return salary;
  } catch (err) {
    console.error("❌ Sequelize error in getUserSalary:", err);
    throw err;
  }
};


export const upsertUserSalary = async (data, userId) => {
  const { amount, currency } = data;

  try {
    let salary = await Salary.findOne({ where: { userId } });

    if (!salary) {
      salary = await Salary.create({ amount, currency, userId });
    } else {
      salary.amount = amount;
      if (currency) salary.currency = currency;
      await salary.save();
    }

    return salary;
  } catch (err) {
    console.error("Error in upsertUserSalary:", err);
    throw err;
  }
};
