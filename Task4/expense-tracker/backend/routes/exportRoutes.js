import express from "express";
import validateExportRequest from "../middleware/validateExportData.js";
import { generateFile } from "../utils/fileGenerators/generateFiles.js";
import setFileHeaders from "../utils/helpers/setFileHeaders.js";
import { sendResponse } from "../utils/helpers/responseHelpers.js";

const router = express.Router();

router.post("/", validateExportRequest, async (req, res) => {
  const { expenses, summary } = req.validatedData;
  const { type } = req.validatedQuery;

  try {
    const buffer = await generateFile(type, summary, expenses);

    setFileHeaders(res, type, "expenses");

    return sendResponse(res, {
      data: buffer,
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
