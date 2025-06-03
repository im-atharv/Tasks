import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    desc: { type: String, required: true },
    category: { type: String, enum: ["Needs", "Wants"], required: true },
    date: { type: String, default: new Date().toLocaleDateString() },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
