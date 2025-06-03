export default function Summary({ expenses = [], salary = 0, currency = 'USD' }) {
    // Convert salary to number, default 0 if invalid
    const salaryNum = Number(salary) || 0;
  
    // Calculate expenses grouped by category (case-insensitive)
    const summary = expenses.reduce((acc, exp) => {
      const category = exp.category ? exp.category.trim() : 'Other';
      const amount = parseFloat(exp.amount);
      if (isNaN(amount)) return acc;
  
      // Normalize category names (capitalize first letter)
      const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  
      acc[formattedCategory] = (acc[formattedCategory] || 0) + amount;
      return acc;
    }, {});
  
    // Total spent
    const totalSpent = Object.values(summary).reduce((sum, val) => sum + val, 0);
  
    // Calculate savings and percentage (avoid division by zero)
    const savings = Math.max(0, salaryNum - totalSpent);
    const savingsPercentage = salaryNum > 0 ? ((savings / salaryNum) * 100).toFixed(2) : '0.00';
  
    // Function to get CSS classes by category
    const getCategoryClasses = (category) => {
      switch (category) {
        case 'Needs':
          return {
            bg: 'bg-green-100',
            text: 'text-green-600',
            textBold: 'text-green-800',
          };
        case 'Wants':
          return {
            bg: 'bg-yellow-100',
            text: 'text-yellow-600',
            textBold: 'text-yellow-800',
          };
        default:
          return {
            bg: 'bg-blue-100',
            text: 'text-blue-600',
            textBold: 'text-blue-800',
          };
      }
    };
  
    return (
      <div className="mt-4 space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700">Monthly Summary</h2>
  
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.keys(summary).length === 0 && (
            <p className="text-gray-500 col-span-full text-center">No expenses recorded yet.</p>
          )}
          {Object.entries(summary).map(([category, amount]) => {
            const classes = getCategoryClasses(category);
            return (
              <div key={category} className={`p-4 rounded-lg ${classes.bg}`}>
                <p className={`text-xs sm:text-sm ${classes.text}`}>{category}</p>
                <p className={`font-bold text-base sm:text-lg ${classes.textBold}`}>
                  {currency} {amount.toFixed(2)}
                </p>
              </div>
            );
          })}
  
          {/* Savings box */}
          <div className="p-4 rounded-lg bg-blue-100">
            <p className="text-xs sm:text-sm text-blue-600">Savings</p>
            <p className="font-bold text-base sm:text-lg text-blue-800">
              {currency} {savings.toFixed(2)}
            </p>
            <p className="text-xs sm:text-sm text-blue-600">({savingsPercentage}% of salary)</p>
          </div>
        </div>
  
        {/* Total Summary */}
        <div className="mt-4 p-4 rounded-lg border bg-gray-50 shadow">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">Total Spent</span>
            <span className="font-bold text-gray-800">
              {currency} {totalSpent.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="font-medium text-gray-700">Remaining Savings</span>
            <span className={`font-bold ${savings > 0 ? 'text-green-700' : 'text-red-700'}`}>
              {currency} {savings.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    );
  }
  