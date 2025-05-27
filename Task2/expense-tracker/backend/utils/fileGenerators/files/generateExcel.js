const { createExcelWorkbook } = require("../templates/excelTemplate");

exports.generateExcelBuffer = (summary,expenses) => {
  return createExcelWorkbook(summary, expenses);
};
