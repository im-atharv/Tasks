import express from "express";
import validateExportRequest from "../middleware/validateExportData.js";
import { generatePDFBuffer } from "../utils/fileGenerators/files/generatePDF.js";
import { generateExcelBuffer } from "../utils/fileGenerators/files/generateExcel.js";
import setFileHeaders from "../utils/setFileHeaders.js";
import { sendResponse } from "../utils/responseHelpers.js";

const router = express.Router();

router.post("/", validateExportRequest, async (req, res) => {
  const { expenses, summary } = req.validatedData;
  const { type } = req.validatedQuery;

  try {
    const buffer = type === "pdf"
      ? await generatePDFBuffer(summary, expenses)
      : await generateExcelBuffer(summary, expenses);

    setFileHeaders(res, type, "expenses");

    return sendResponse(res, {
      data: buffer, // default status is 200
    });
  } catch (err) {
    console.error("Export generation error:", err);
    return sendResponse(res, {
      status: 500,
      error: err.message || "Failed to export file",
    });
  }
});

export default router;
