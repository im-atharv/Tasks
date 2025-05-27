// validator.js
const { z } = require("zod");

const expenseSchema = z.object({
  desc: z.string().min(1, "Description is required"),
  amount: z.number().nonnegative("Amount must be a positive number"),
  category: z.string().min(1, "Category is required"),
  date: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

const summarySchema = z.object({
  salary: z.number().optional(),
  needs: z.number().optional(),
  wants: z.number().optional(),
  savings: z.number().optional(),
  total: z.number().optional(),
  remaining: z.number().optional(),
});

const exportRequestSchema = z.object({
  expenses: z.array(expenseSchema).nonempty("Expenses array cannot be empty"),
  summary: summarySchema,
});

module.exports = {
  exportRequestSchema,
};
