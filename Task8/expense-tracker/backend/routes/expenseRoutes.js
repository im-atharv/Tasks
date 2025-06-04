import express from "express";
import {
  createExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense
} from "../controllers/expenseController.js";

const router = express.Router();

router.get("/", getAllExpenses);
router.post("/", createExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;
