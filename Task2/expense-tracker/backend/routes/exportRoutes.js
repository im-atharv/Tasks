// Import Express and create a router instance
const express = require("express");
const router = express.Router();

// Import middleware and utility functions
const validateExportRequest = require("../middleware/validateExportData"); // Zod-based validation middleware
const { generatePDFBuffer } = require("../utils/fileGenerators/files/generatePDF"); // PDF generator function
const { generateExcelBuffer } = require("../utils/fileGenerators/files/generateExcel"); // Excel generator function
const setFileHeaders = require("../utils/setFileHeaders"); // Utility to set correct headers for file download
const { sendSuccess, handleError } = require("../utils/responseHelpers"); // Standardized response handlers

// POST route to handle file export (either PDF or Excel)
// URL pattern: /api/export?type=pdf or /api/export?type=excel
router.post("/", validateExportRequest, async (req, res) => {
  const { type } = req.query; // Get export type from query params
  const { expenses, summary } = req.validatedData; // Extract validated expense data from middleware

  // Validate export type
  if (!["pdf", "excel"].includes(type)) {
    return res.status(400).json({ error: "Invalid export type. Use ?type=pdf or ?type=excel" });
  }

  try {
    // Generate file buffer based on requested type
    const buffer = type === "pdf"
      ? await generatePDFBuffer(summary, expenses)
      : await generateExcelBuffer(summary, expenses);

    // Set correct response headers for file download
    setFileHeaders(res, type, "expenses");

    // Send file buffer as a successful response
    return sendSuccess(res, buffer);
  } catch (err) {
    console.error(`Export generation error:`, err);

    // Send a standardized error response
    return handleError(res, {
      code: "GENERATION_ERROR",
      message: err.message || "Failed to export file",
    });
  }
});

// Export the router to be used in app.js
module.exports = router;
