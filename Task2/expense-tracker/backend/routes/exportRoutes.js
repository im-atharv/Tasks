const express = require("express");
const router = express.Router();

const validateExportRequest = require("../middleware/validateExportData");
const { generatePDFBuffer } = require("../utils/generatePDF");
const { generateExcelBuffer } = require("../utils/generateExcel");
const { setFileHeaders, sendSuccess, handleError } = require("../utils/responseHelpers");

router.post("/", validateExportRequest, async (req, res) => {
  const { type } = req.query;
  const { expenses, summary } = req.validatedData;

  if (!["pdf", "excel"].includes(type)) {
    return res.status(400).json({ error: "Invalid export type. Use ?type=pdf or ?type=excel" });
  }

  try {
    const buffer = type === "pdf"
      ? await generatePDFBuffer(summary, expenses)
      : await generateExcelBuffer(summary, expenses);

    setFileHeaders(res, type, "expenses");
    return sendSuccess(res, buffer);
  } catch (err) {
    console.error(`Export generation error:`, err);
    return handleError(res, {
      code: "GENERATION_ERROR",
      message: err.message || "Failed to export file",
    });
  }
});

module.exports = router;
