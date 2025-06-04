import XLSX from "xlsx";

export const createExcelWorkbook = (summary, expenses) => {
  const workbook = XLSX.utils.book_new();
  const expenseSheet = XLSX.utils.json_to_sheet(expenses);
  const summarySheetData = Object.entries(summary).map(([key, val]) => [key, val || 0]);
  const summarySheet = XLSX.utils.aoa_to_sheet(summarySheetData);

  XLSX.utils.book_append_sheet(workbook, expenseSheet, "Expenses");
  XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");

  return XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
};
