const express = require("express"); //Get the express package
const bodyParser = require("body-parser"); // Middleware to parse incoming JSON requests
const helmet = require("helmet"); // Middleware to enhance API security with HTTP headers
const cors = require("cors"); // Middleware to enable Cross-Origin Resource Sharing (CORS)
const exportRoutes = require("./routes/exportRoutes"); // Import export-related API routes

// Create an Express application
const app = express();

// Apply security-related HTTP headers
app.use(helmet());

// Enable CORS to allow requests from different origins
app.use(cors());

// Parse incoming request bodies in JSON format
app.use(bodyParser.json());

// Health Check Route useful for confirming that the backend is up and running
app.get("/", (req, res) => {
  res.send("Expense Tracker Backend is running");
});

// Mount export-related routes under /api/export path
app.use("/api/export", exportRoutes);

// Export the app instance to be used in server.js
module.exports = app;
