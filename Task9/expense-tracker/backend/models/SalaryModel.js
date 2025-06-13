import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Salary = sequelize.define('Salary', {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: 'USD',
  },
  userId: {
    type: DataTypes.STRING, // ✅ Use STRING if userId is MongoDB _id
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default Salary;
