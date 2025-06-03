import mongoose from 'mongoose';

const SalarySchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'USD',
  },
}, { timestamps: true });

const Salary = mongoose.model('Salary', SalarySchema);

export default Salary;
