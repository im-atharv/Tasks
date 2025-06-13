// services/exportService.js
import Expense from "../models/Expense.js";
import Salary from "../models/SalaryModel.js";
import {generatePDFBuffer} from "../utils/fileGenerators/files/generatePDF.js";
import {generateExcelBuffer} from "../utils/fileGenerators/files/generateExcel.js";
import { exportQuerySchema } from "../utils/validations/validationSchemas.js";

export const generateExportFile = async (query, userId) => {
  const parsed = exportQuerySchema.safeParse(query);
  if (!parsed.success) {
    return { error: parsed.error.format().type?._errors?.[0] || "Invalid export type" };
  }

  const { type } = parsed.data;

  // Fetch user-specific data
  const [expenses, salary] = await Promise.all([
    Expense.findAll({ where: { userId } }),
    Salary.findOne({ where: { userId } }),
  ]);

  // Prepare data payload
  const data = {
    expenses: expenses.map(e => e.toJSON()),
    salary: salary?.toJSON() || null,
  };

  // Generate and return file buffer
  if (type === "pdf") {
    const buffer = await generatePDFBuffer(data);
    return { buffer, filename: "expense_report.pdf", mime: "application/pdf" };
  }

  if (type === "excel") {
    const buffer = await generateExcelBuffer(data);
    return { buffer, filename: "expense_report.xlsx", mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" };
  }

  return { error: "Unsupported export type" };
};
