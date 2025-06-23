// services/exportService.js

import Expense from "../models/Expense.js";
import Salary from "../models/SalaryModel.js";
import { generatePDFBuffer } from "../utils/fileGenerators/files/generatePDF.js";
import { generateExcelBuffer } from "../utils/fileGenerators/files/generateExcel.js";
import { exportQuerySchema } from "../utils/validations/validationSchemas.js";

// Handles generation of export file (PDF or Excel) for a specific user
export const generateExportFile = async (query, userId) => {
  // Validate query parameters (type should be either 'pdf' or 'excel')
  const parsed = exportQuerySchema.safeParse(query);
  if (!parsed.success) {
    return {
      error:
        parsed.error.format().type?._errors?.[0] || "Invalid export type",
    };
  }

  const { type } = parsed.data;

  // Fetch user's expenses and salary data in parallel
  const [expenses, salary] = await Promise.all([
    Expense.findAll({ where: { userId } }),
    Salary.findOne({ where: { userId } }),
  ]);

  // Structure data to be passed into the file generators
  const data = {
    expenses: expenses.map((e) => e.toJSON()),
    salary: salary?.toJSON() || null,
  };

  // Based on requested type, generate the corresponding file buffer
  if (type === "pdf") {
    const buffer = await generatePDFBuffer(data);
    return {
      buffer,
      filename: "expense_report.pdf",
      mime: "application/pdf",
    };
  }

  if (type === "excel") {
    const buffer = await generateExcelBuffer(data);
    return {
      buffer,
      filename: "expense_report.xlsx",
      mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    };
  }

  // Return error if file type is unsupported
  return { error: "Unsupported export type" };
};
