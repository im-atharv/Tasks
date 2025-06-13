import {
  getUserSalary,
  upsertUserSalary,
} from "../services/salaryService.js";
import { sendSuccess, sendError } from "../utils/helpers/responseHelpers.js";

export const getSalary = async (req, res) => {
  try {
    console.log("GET Salary - userId:", req.userId); // ✅ Debug log
    const salary = await getUserSalary(req.userId);
    if (!salary) return sendError(res, "No salary data found", 404);
    sendSuccess(res, salary);
  } catch (err) {
    console.error("Error in getSalary:", err); // ✅ Error log
    sendError(res, "Server error");
  }
};

export const upsertSalary = async (req, res) => {
  const { amount } = req.body;

  if (amount === undefined || isNaN(amount)) {
    return sendError(res, "Amount must be a number", 400); // ✅ Allow 0
  }

  try {
    console.log("UPSERT Salary - userId:", req.userId, "Body:", req.body); // ✅ Debug
    const salary = await upsertUserSalary(req.body, req.userId);
    sendSuccess(res, salary);
  } catch (err) {
    console.error("Error in upsertSalary:", err); // ✅ Error log
    sendError(res, "Failed to save salary");
  }
};
