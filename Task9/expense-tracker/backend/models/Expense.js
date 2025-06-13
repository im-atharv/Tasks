// models/Expense.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Expense = sequelize.define('Expense', {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.ENUM('Needs', 'Wants'),
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    defaultValue: new Date().toLocaleDateString(),
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default Expense;
