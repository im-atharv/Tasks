import { createExcelWorkbook } from "../templates/excelTemplate.js";

export const generateExcelBuffer = (summary, expenses) => {
  return createExcelWorkbook(summary, expenses);
};
