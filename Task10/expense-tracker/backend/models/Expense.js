// models/Expense.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { CATEGORIES } from "../constants.js";

/**
 * Expense Model
 *
 * Represents a single expense record associated with a user.
 * Each record tracks the amount, description, category, and date.
 */

const Expense = sequelize.define(
  'Expense',
  {
    // Amount spent (required)
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    // Short description of the expense (e.g., "groceries")
    desc: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Category: "Needs" or "Wants"
    category: {
      type: DataTypes.ENUM(...Object.values(CATEGORIES)),
      allowNull: false,
    },

    // Date of expense (stored as string)
    date: {
      type: DataTypes.STRING,
      defaultValue: new Date().toLocaleDateString(), // 🕒 Defaults to today's date
    },

    // User identifier (links to MongoDB user._id or session userId)
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Automatically adds createdAt & updatedAt fields
    timestamps: true,
  }
);

export default Expense;
