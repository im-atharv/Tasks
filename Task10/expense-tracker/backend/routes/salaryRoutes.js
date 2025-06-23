// routes/salaryRoutes.js

import express from "express";
import { getSalary, upsertSalary } from "../controllers/salaryController.js";
import requireAuth from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/salary
// Fetches the salary data for the currently authenticated user.
// Uses JWT-based cookie authentication via `requireAuth` middleware.
router.get("/", requireAuth, getSalary);

// POST /api/salary
// Creates or updates the salary for the authenticated user.
// Uses JWT-based cookie authentication via `requireAuth` middleware.
router.post("/", requireAuth, upsertSalary);

export default router;
