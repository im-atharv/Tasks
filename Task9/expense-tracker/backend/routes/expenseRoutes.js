import express from "express";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  deleteAllExpenses,
} from "../controllers/expenseController.js";
import requireAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(requireAuth); // ✅ All routes protected

router.get("/", getExpenses);
router.post("/", createExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);
router.delete("/", deleteAllExpenses);

export default router;
