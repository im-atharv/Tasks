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
}, {
  timestamps: true,
});

export default Salary;
