//A functional component for the expense list taking three props
export default function ExpenseList({ expenses, onEdit, expenseRefs }) {
    return (
        <div className="space-y-2">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-700">All Expenses</h2>
            {/* If expenses array is empty then just show No expenses yet. */}
            {expenses.length === 0 && (
                <p className="text-gray-500 text-sm">No expenses yet.</p>
            )}
            {expenses.map((exp) => (
                <div
                    key={exp.id}
                    // Stores the reference to this DOM element under its id
                    ref={(el) => (expenseRefs.current[exp.id] = el)}
                    className="flex justify-between items-center bg-gray-50 p-2 sm:p-3 rounded-lg shadow text-sm sm:text-base"
                >
                    <div>
                        <p className="font-medium">{exp.desc}</p>
                        <p className="text-xs sm:text-sm text-gray-500">
                            {exp.category} • {exp.date}
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-indigo-700 font-bold">${exp.amount.toFixed(2)}</span>
                        <button
                            onClick={() => onEdit(exp)}
                            className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg cursor-pointer"
                        >
                            Edit
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}
