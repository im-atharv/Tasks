import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";
import exportRoutes from "./routes/exportRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js"; // Add routes for handling expenses
import salaryRoutes from "./routes/salaryRoutes.js"; // Import salary routes
import dotenv from "dotenv";
dotenv.config();

const app = express();

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ Failed to connect to MongoDB:", error));

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Expense Tracker Backend is running");
});

// Expense routes for CRUD operations (create, read, update, delete)
app.use("/api/expenses", expenseRoutes);

// Add salary routes for saving and fetching salary data
app.use("/api/salary", salaryRoutes); // This route will handle salary CRUD operations

app.use("/api/export", exportRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`✅ Expense Tracker Backend running on http://localhost:${PORT}`);
});
