import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import exportRoutes from "./routes/exportRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js"; // Add routes for handling expenses
import salaryRoutes from "./routes/salaryRoutes.js"; // Import salary routes
import dotenv from "dotenv";
import sequelize from './config/database.js';
dotenv.config();

const app = express();

sequelize.authenticate()
  .then(() => {
    console.log('✅ Connected to PostgreSQL');
    return sequelize.sync(); // auto-create tables
  })
  .then(() => {
    console.log('✅ Tables synchronized');
  })
  .catch(err => console.error('❌ PostgreSQL connection error:', err));


app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Expense Tracker Backend is running");
});

// Expense routes for CRUD operations (create, read, update, delete)
app.use("/api/expenses", expenseRoutes);

// This route will handle salary CRUD operations
app.use("/api/salary", salaryRoutes);

// This route will handle exporting data
app.use("/api/export", exportRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`✅ Expense Tracker Backend running on http://localhost:${PORT}`);
});
