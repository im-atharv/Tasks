import express from "express";
import validateExportRequest from "../middleware/validateExportData.js";
import { generateFile } from "../utils/fileGenerators/generateFiles.js";
import setFileHeaders from "../utils/helpers/setFileHeaders.js";

const router = express.Router();

router.post("/", validateExportRequest, async (req, res) => {
  const { summary, expenses } = req.validatedData;
  const { type } = req.validatedQuery;

  try {
    const buffer = await generateFile(type, summary, expenses);
    setFileHeaders(res, type, "expenses");
    res.status(200).send(buffer);
  } catch (err) {
    console.error("Export generation error:", err);
    res.status(500).json({ error: err.message || "Failed to export file" });
  }
});

export default router;
