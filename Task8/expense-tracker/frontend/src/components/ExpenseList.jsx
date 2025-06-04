import React from "react";

export default function ExpenseList({ expenses, onEdit, expenseRefs, currency, onDelete }) {
    return (
        <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-700">All Expenses</h2>

            {/* If expenses array is empty then just show No expenses yet. */}
            {expenses.length === 0 ? (
                <div className="text-center text-gray-500">
                    <p className="text-sm sm:text-base">No expenses yet.</p>
                    <button
                        onClick={() => alert('Add an expense!')} // Placeholder action to add expense
                        className="mt-4 text-blue-500 hover:text-blue-700 text-sm"
                    >
                        Add an Expense
                    </button>
                </div>
            ) : (
                expenses.map((exp) => (
                    <div
                        key={exp.id}
                        ref={(el) => (expenseRefs.current[exp.id] = el)} // Stores reference to the DOM element
                        className="flex justify-between items-center bg-gray-50 p-2 sm:p-3 rounded-lg shadow text-sm sm:text-base"
                    >
                        <div>
                            <p className="font-medium">{exp.desc}</p>
                            <p className="text-xs sm:text-sm text-gray-500">
                                {exp.category} • {exp.date}
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-indigo-700 font-bold">
                                {currency} {typeof exp.amount === 'number' ? exp.amount.toFixed(2) : '0.00'}
                            </span>
                            <button
                                onClick={() => onEdit(exp)}
                                className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg cursor-pointer"
                                aria-label={`Edit expense for ${exp.desc}`} // Improve accessibility
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(exp.id)}  // Trigger delete for this expense
                                className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg cursor-pointer"
                                aria-label={`Delete expense for ${exp.desc}`} // Improve accessibility
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
