import express from "express";
import validateExportRequest from "../middleware/validateExportData.js";
import { exportData } from "../controllers/exportController.js";
import requireAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(requireAuth); // ✅ Protected export
router.post("/", validateExportRequest, exportData);

export default router;
