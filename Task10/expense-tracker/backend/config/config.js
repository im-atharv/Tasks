// config/config.js

// Load environment variables from .env file into process.env
import dotenv from "dotenv";
dotenv.config();

// Sequelize configuration for different environments (used by Sequelize CLI & instance)
export default {
  development: {
    // Development database URL (PostgreSQL)
    url: process.env.POSTGRES_URI, // Stored securely in .env
    dialect: "postgres", // Specifies the SQL dialect used by Sequelize
  },
  test: {
    // Configuration used during testing
    url: process.env.POSTGRES_URI, // Can be replaced with a separate test DB URI if needed
    dialect: "postgres",
  },
  production: {
    // Production environment configuration
    url: process.env.POSTGRES_URI, // Should point to production-grade DB
    dialect: "postgres",
  },
};
