// server.js
import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import sequelize from './config/database.js';

import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import salaryRoutes from "./routes/salaryRoutes.js";
import exportRoutes from "./routes/exportRoutes.js";

dotenv.config();
const app = express();

// 🔐 Global Middleware
app.use(helmet());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// 🔁 Routes
app.get("/", (req, res) => {
  res.send("🚀 Expense Tracker Backend is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/salary", salaryRoutes);
app.use("/api/export", exportRoutes);

// 🔌 DB + Server Init
const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    // Connect Mongo (Auth)
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // Connect Postgres (App Data)
    await sequelize.authenticate();
    sequelize.sync({ force: false });

    console.log("✅ Connected to PostgreSQL");

    await sequelize.sync(); // Auto-create tables
    console.log("✅ PostgreSQL tables synchronized");

    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server failed to start:", err);
    process.exit(1);
  }
};

startServer();
