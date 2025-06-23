// server.js

// Import necessary core and third-party modules
import express from "express";
import dotenv from "dotenv";
import helmet from "helmet"; // Adds security-related HTTP headers
import cors from "cors"; // Enables Cross-Origin Resource Sharing
import cookieParser from "cookie-parser"; // Parses cookies from the HTTP headers
import mongoose from "mongoose"; // ODM for MongoDB
import bodyParser from "body-parser"; // Parses incoming request bodies (legacy, optional with express.json)
import sequelize from './config/database.js'; // Sequelize instance for PostgreSQL

// Import route modules
import authRoutes from "./routes/authRoutes.js";         // Handles user authentication (MongoDB + JWT)
import expenseRoutes from "./routes/expenseRoutes.js";   // Handles expense CRUD (PostgreSQL)
import salaryRoutes from "./routes/salaryRoutes.js";     // Handles salary data (PostgreSQL)
import exportRoutes from "./routes/exportRoutes.js";     // Handles PDF and Excel export

dotenv.config(); // Load environment variables from .env file

const app = express(); // Initialize Express application

// Apply global middleware
app.use(helmet()); // Apply security best practices via HTTP headers
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Allow frontend to access backend with cookies
app.use(bodyParser.json()); // Parse JSON bodies (older style)
app.use(express.json()); // Parse JSON bodies (modern Express way)
app.use(cookieParser()); // Allow reading and writing cookies (used for storing JWT token)

// Root route for health check
app.get("/", (req, res) => {
  res.send("Expense Tracker Backend is running");
});

// Mount API routes
app.use("/api/auth", authRoutes);     // User auth: signup, login (MongoDB + JWT + cookie)
app.use("/api/expenses", expenseRoutes); // Expense data (CRUD via PostgreSQL)
app.use("/api/salary", salaryRoutes);     // Salary logic (PostgreSQL)
app.use("/api/export", exportRoutes);     // Export functionality (PDF/Excel using Puppeteer/XLSX)

// Start server + initialize databases
const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    // Connect to MongoDB for user authentication
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // Connect to PostgreSQL for core app data
    await sequelize.authenticate();
    console.log("✅ Connected to PostgreSQL");

    // Sync Sequelize models to DB (doesn't drop tables)
    await sequelize.sync({ force: false }); // Set to true only during migrations or resets
    console.log("✅ PostgreSQL tables synchronized");

    // Start Express server
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });

  } catch (err) {
    // Handle startup errors (DB or server failures)
    console.error("❌ Server failed to start:", err);
    process.exit(1); // Exit process with failure
  }
};

startServer(); // Start the backend
