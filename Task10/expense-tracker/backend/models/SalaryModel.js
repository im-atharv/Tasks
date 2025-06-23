// models/Salary.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

/**
 * Salary Model
 *
 * Stores monthly salary information for each user.
 * Connected to the MongoDB-authenticated user via `userId`.
 */

const Salary = sequelize.define(
  'Salary',
  {
    // Monthly salary amount (required)
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    // Currency code (e.g., USD, INR), default is 'USD'
    currency: {
      type: DataTypes.STRING,
      defaultValue: 'USD',
    },

    // Associated user ID from MongoDB (stored as string)
    userId: {
      type: DataTypes.STRING, // Matches with MongoDB _id format
      allowNull: false,
    },
  },
  {
    // Adds createdAt and updatedAt timestamps
    timestamps: true,
  }
);

export default Salary;
