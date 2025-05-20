export default function Summary({ expenses, salary }) {
    const summary = {
        Needs: 0,
        Wants: 0
    }

    expenses.forEach(exp => {
        if (summary[exp.category] !== undefined) {
            summary[exp.category] += parseFloat(exp.amount)
        }
    })

    const totalSpent = summary.Needs + summary.Wants
    const savings = Math.max(0, salary - totalSpent)

    return (
        <div className="mt-4 space-y-2">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-700">Monthly Summary</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="bg-green-100 p-3 sm:p-4 rounded-lg">
                    <p className="text-xs sm:text-sm text-green-600">Needs</p>
                    <p className="font-bold text-green-800 text-base sm:text-lg">${summary.Needs.toFixed(2)}</p>
                </div>
                <div className="bg-yellow-100 p-3 sm:p-4 rounded-lg">
                    <p className="text-xs sm:text-sm text-yellow-600">Wants</p>
                    <p className="font-bold text-yellow-800 text-base sm:text-lg">${summary.Wants.toFixed(2)}</p>
                </div>
                <div className="bg-blue-100 p-3 sm:p-4 rounded-lg">
                    <p className="text-xs sm:text-sm text-blue-600">Savings</p>
                    <p className="font-bold text-blue-800 text-base sm:text-lg">${savings.toFixed(2)}</p>
                </div>
            </div>
        </div>
    )
}
