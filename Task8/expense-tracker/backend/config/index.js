import mongoose from "mongoose";
import sequelize from './database.js'; // For PostgreSQL
import dotenv from "dotenv";

dotenv.config();

// Database Initialization based on DATABASE_TYPE
const connectToDatabase = async () => {
  const dbType = process.env.DATABASE_TYPE;

  if (dbType === "mongo") {
    // MongoDB connection
    const MONGO_URI = process.env.MONGO_URI;
    try {
      await mongoose.connect(MONGO_URI);
      console.log("✅ Connected to MongoDB");
    } catch (err) {
      console.error("❌ MongoDB connection error:", err);
      throw err;
    }
  } else if (dbType === "postgres") {
    // PostgreSQL connection
    try {
      await sequelize.authenticate();
      await sequelize.sync(); // sync all models
      console.log("✅ Connected to PostgreSQL and Tables synchronized");
    } catch (err) {
      console.error("❌ PostgreSQL connection error:", err);
      throw err;
    }
  } else {
    throw new Error("Invalid database type in .env");
  }
};

export { connectToDatabase };
