import express from "express";
import validateExportRequest from "../middleware/validateExportData.js";
import { generateFile } from "../utils/fileGenerators/generateFiles.js";
import setFileHeaders from "../utils/helpers/setFileHeaders.js";

const router = express.Router();

router.post("/", validateExportRequest, async (req, res) => {
  const { summary, expenses } = req.validatedData;
  const { type } = req.validatedQuery;

  // Validate the type (CSV, PDF, etc.)
  const validTypes = ['csv', 'pdf', 'xlsx']; // Add other supported types here
  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: `Invalid export type. Supported types are: ${validTypes.join(', ')}` });
  }

  // Validate that the necessary data exists
  if (!summary || !expenses || !Array.isArray(expenses) || expenses.length === 0) {
    return res.status(400).json({ error: "Summary and expenses data are required" });
  }

  try {
    // Generate the file based on the type (CSV, PDF, XLSX, etc.)
    const buffer = await generateFile(type, summary, expenses);

    // Set the file headers (content type, filename, etc.)
    setFileHeaders(res, type, "expenses");

    // Send the generated file as a buffer
    res.status(200).send(buffer);
  } catch (err) {
    console.error("Export generation error:", err);
    res.status(500).json({ error: err.message || "Failed to export file" });
  }
});

export default router;
