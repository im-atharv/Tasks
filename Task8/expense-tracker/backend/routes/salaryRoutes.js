import express from "express";
import { getSalary, createOrUpdateSalary } from "../controllers/salaryController.js";

const router = express.Router();

router.get("/", getSalary);
router.post("/", createOrUpdateSalary);

export default router;
