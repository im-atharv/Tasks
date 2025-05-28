import { z } from "zod";

// Expense Item Schema
export const expenseSchema = z.object({
    desc: z.string().min(1, "Description is required"),
    amount: z.number().nonnegative("Amount must be a positive number"),
    category: z.enum(["Needs", "Wants"], {
        errorMap: () => ({ message: "Category must be either 'Needs' or 'Wants'" }),
    }),
    date: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }),
});

// Summary Schema
export const summarySchema = z.object({
    salary: z.number().nonnegative("Salary cannot be negative"),
    needs: z.number().nonnegative("Needs cannot be negative"),
    wants: z.number().nonnegative("Wants cannot be negative"),
    savings: z.number().nonnegative("Savings cannot be negative"),
    total: z.number().nonnegative("Total cannot be negative"),
    remaining: z.number().nonnegative("Remaining cannot be negative"),
});

// Combined Export Request Schema
export const exportRequestSchema = z.object({
    expenses: z.array(expenseSchema).nonempty("Expenses array cannot be empty"),
    summary: summarySchema,
});

//Combined Query file type schema
export const exportQuerySchema = z.object({
    type: z.enum(["pdf", "excel"], {
        errorMap: () => ({ message: "Type must be either 'pdf' or 'excel'" }),
    }),
});
