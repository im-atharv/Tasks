import mongoose from 'mongoose';

const salarySchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'USD',
  },
}, { timestamps: true });

const Salary = mongoose.model('Salary', salarySchema);

export default Salary;
