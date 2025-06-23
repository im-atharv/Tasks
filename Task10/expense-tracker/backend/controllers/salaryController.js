// controllers/salaryController.js

// Import business logic for salary operations
import {
  getUserSalary,
  upsertUserSalary,
} from "../services/salaryService.js";

// Import response helpers for consistent API replies
import { sendSuccess, sendError } from "../utils/helpers/responseHelpers.js";

/**
 * GET /api/salary
 * Fetches the salary record for the authenticated user.
 */
export const getSalary = async (req, res) => {
  try {
    // Fetch salary for current user using userId from auth middleware
    const salary = await getUserSalary(req.userId);

    if (!salary) {
      // If no record is found, return 404
      return sendError(res, "No salary data found", 404);
    }

    // Return salary data
    sendSuccess(res, salary);
  } catch (err) {
    // General server error
    sendError(res, "Server error");
  }
};

/**
 * POST or PUT /api/salary
 * Creates or updates the user's salary record (upsert behavior).
 *
 * - Validates input amount
 * - Calls upsertUserSalary service to insert or update
 */
export const upsertSalary = async (req, res) => {
  const { amount } = req.body;

  // Input validation: Amount must be a valid number
  if (amount === undefined || isNaN(amount)) {
    return sendError(res, "Amount must be a number", 400);
  }

  try {
    // Upsert logic: either creates a new salary or updates existing one
    console.log("UPSERT Salary - userId:", req.userId, "Body:", req.body); // Useful for debugging

    const salary = await upsertUserSalary(req.body, req.userId);

    // Return the upserted salary object
    sendSuccess(res, salary);
  } catch (err) {
    // Handle failure gracefully
    sendError(res, "Failed to save salary");
  }
};
