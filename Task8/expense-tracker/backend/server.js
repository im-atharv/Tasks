import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from './config/index.js';
import expenseRoutes from './routes/expenseRoutes.js';
import salaryRoutes from './routes/salaryRoutes.js';
import exportRoutes from './routes/exportRoutes.js';

dotenv.config();

const app = express();

// Connect to the database
connectToDatabase();

// Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Expense Tracker Backend is running");
});

// Routes
app.use("/api/expenses", expenseRoutes);
app.use("/api/salary", salaryRoutes);
app.use("/api/export", exportRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
