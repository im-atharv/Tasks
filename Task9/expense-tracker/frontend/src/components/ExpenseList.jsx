// src/components/ExpenseList.jsx

const ExpenseList = ({ expenses, onDelete, onEdit, expenseRefs }) => {
  if (expenses.length === 0) {
    return (
      <p className="text-center text-gray-400 text-base italic">
        No expenses recorded yet.
      </p>
    );
  }

  return (
    <div className="grid gap-4">
      {expenses.map((expense) => (
        <div
          key={expense.id || expense._id}
          ref={(el) => {
            if (expenseRefs) {
              expenseRefs.current[expense.id || expense._id] = el;
            }
          }}
          className="flex justify-between items-start bg-white border border-gray-200 p-5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
        >
          {/* Expense Content */}
          <div className="space-y-1">
            <h4 className="text-xl font-semibold text-gray-800">{expense.desc}</h4>

            <p className="text-lg text-blue-600 font-bold mt-1">₹{expense.amount}</p>

            <span
              className={`inline-block mt-2 px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full 
              ${expense.category === "needs"
                ? "bg-green-100 text-green-700"
                : expense.category === "wants"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-purple-100 text-purple-700"
              }`}
            >
              {expense.category}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-end space-y-2">
            <button
              onClick={() => onEdit(expense)}
              className="text-sm font-medium text-blue-600 hover:text-blue-800 transition"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => onDelete(expense.id || expense._id)}
              className="text-sm font-medium text-red-500 hover:text-red-700 transition"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
