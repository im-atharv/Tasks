import express from "express";
import { getSalary, upsertSalary } from "../controllers/salaryController.js";
import requireAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(requireAuth); // ✅ All routes protected

router.get("/", getSalary);
router.post("/", upsertSalary);

export default router;
