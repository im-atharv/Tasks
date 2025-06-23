// config/database.js

// Import Sequelize ORM and dotenv to handle environment variables
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

// Initialize Sequelize instance using PostgreSQL connection URI
const sequelize = new Sequelize(process.env.POSTGRES_URI, {
  dialect: 'postgres', // Specify which SQL dialect is used (PostgreSQL in this case)
  logging: false, // Disable SQL logging in the console (can be enabled for debugging)
});

// Automatically synchronizes models with the database schema
// `alter: true` updates existing tables to match models without dropping them (safe for development)
await sequelize.sync({ alter: true });

// Export the configured Sequelize instance to be used in other modules
export default sequelize;
