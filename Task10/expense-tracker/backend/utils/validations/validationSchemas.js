// src/validators/index.js or wherever your validation file is

import { z } from "zod";
import { EXPORT_TYPE_VALUES, CATEGORIES_VALUES } from "../../constants.js";

// Email + Password
const emailSchema = z.string().email("Invalid email address");
const passwordSchema = z.string().min(8, "Min 8 chars")
  .regex(/[a-z]/, "Must include lowercase")
  .regex(/[A-Z]/, "Must include uppercase")
  .regex(/[0-9]/, "Must include number");

// 🆕 Signup Schema (with name)
export const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: emailSchema,
  password: passwordSchema,
});

// 🆕 Login Schema (no name)
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// 👇 The rest is unchanged
export const expenseSchema = z.object({
  desc: z.string().min(1, "Description is required"),
  amount: z.number().nonnegative("Amount must be a positive number"),
  category: z.enum(CATEGORIES_VALUES, {
    errorMap: () => ({ message: `Category must be: ${CATEGORIES_VALUES.join(", ")}` }),
  }),
  date: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

export const summarySchema = z.object({
  salary: z.number().nonnegative(),
  needs: z.number().nonnegative(),
  wants: z.number().nonnegative(),
  savings: z.number().nonnegative(),
  total: z.number().nonnegative(),
  remaining: z.number().nonnegative(),
});

export const exportRequestSchema = z.object({
  expenses: z.array(expenseSchema).nonempty("Expenses cannot be empty"),
  summary: summarySchema,
});

export const exportQuerySchema = z.object({
  type: z.enum(EXPORT_TYPE_VALUES, {
    errorMap: () => ({ message: `Type must be one of: ${EXPORT_TYPE_VALUES.join(", ")}` }),
  }),
});
