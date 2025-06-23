// routes/exportRoutes.js

import express from "express";
import validateExportRequest from "../middleware/validateExportData.js";
import { exportData } from "../controllers/exportController.js";
import requireAuth from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Export Routes (Protected)
 *
 * This route handles exporting user data (expenses & summary)
 * as a PDF or Excel file.
 *
 * - POST /api/export
 *   - Requires valid JWT (via cookie)
 *   - Validates request body and query using Zod schemas
 *   - Returns a file buffer with correct headers set
 */

// 🧾 Generate and return export file (PDF/Excel)
router.post("/", validateExportRequest, requireAuth, exportData);

export default router;
