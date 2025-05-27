const { z } = require("zod");

// Defines a schema to validate each individual expense entry
const expenseSchema = z.object({
  // 'desc' must be a non-empty string
  desc: z.string().min(1, "Description is required"),

  // 'amount' must be a number >= 0
  amount: z.number().nonnegative("Amount must be a positive number"),

  // 'category' must be either 'needs' or 'wants'
  category: z.enum(["Needs", "Wants"], {
    errorMap: () => ({ message: "Category must be either 'needs' or 'wants'" }),
  }),

  // 'date' must be a valid ISO string parseable as a Date
  date: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

// Schema to validate the expense summary with all numbers >= 0
const summarySchema = z.object({
  salary: z.number().nonnegative("Salary cannot be negative"),
  needs: z.number().nonnegative("Needs cannot be negative"),
  wants: z.number().nonnegative("Wants cannot be negative"),
  savings: z.number().nonnegative("Savings cannot be negative"),
  total: z.number().nonnegative("Total cannot be negative"),
  remaining: z.number().nonnegative("Remaining cannot be negative"),
});

// Combined schema for export request validation
const exportRequestSchema = z.object({
  expenses: z.array(expenseSchema).nonempty("Expenses array cannot be empty"),
  summary: summarySchema,
});

module.exports = {
  exportRequestSchema,
};
