import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

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
}, {
  timestamps: true,
});

export default Expense;
