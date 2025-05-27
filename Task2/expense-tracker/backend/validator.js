// Import the Zod library for schema-based validation
const z = require("zod");

// Defines a schema to validate each individual expense entry
const expenseSchema = z.object({

  // 'desc' must be a non-empty string (description of the expense)
  desc: z.string().min(1, "Description is required"),

  // 'amount' must be a number and should not be negative
  amount: z.number().nonnegative("Amount must be a positive number"),

  // 'category' must be a non-empty string (e.g., "Needs", "Wants", etc.)
  category: z.string().min(1, "Category is required"),

  // 'date' must be a string that can be parsed into a valid Date
  date: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format", // Custom error message for invalid dates
  }),
});

// Schema to validate the expense summary
const summarySchema = z.object({
  // All fields must be numbers
  salary: z.number(),
  needs: z.number(),
  wants: z.number(),
  savings: z.number(),
  total: z.number(),
  remaining: z.number(),
});

// Schema to validate the complete export request (e.g., for PDF/Excel generation)
const exportRequestSchema = z.object({
  // 'expenses' must be a non-empty array of valid expense objects
  expenses: z.array(expenseSchema).nonempty("Expenses array cannot be empty"),

  // 'summary' must match the summary schema defined above
  summary: summarySchema,
});

// Export the schema so it can be used in other parts of the application (e.g., route handlers)
module.exports = {
  exportRequestSchema,
};
