import { z } from "zod";

const expenseSchema = z.object({
  desc: z.string().min(1, "Description is required"),
  amount: z.number().nonnegative("Amount must be a positive number"),
  category: z.enum(["Needs", "Wants"], {
    errorMap: () => ({ message: "Category must be either 'needs' or 'wants'" }),
  }),
  date: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

const summarySchema = z.object({
  salary: z.number().nonnegative("Salary cannot be negative"),
  needs: z.number().nonnegative("Needs cannot be negative"),
  wants: z.number().nonnegative("Wants cannot be negative"),
  savings: z.number().nonnegative("Savings cannot be negative"),
  total: z.number().nonnegative("Total cannot be negative"),
  remaining: z.number().nonnegative("Remaining cannot be negative"),
});

export const exportRequestSchema = z.object({
  expenses: z.array(expenseSchema).nonempty("Expenses array cannot be empty"),
  summary: summarySchema,
});