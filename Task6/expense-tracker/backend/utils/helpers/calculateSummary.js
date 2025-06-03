export const calculateSummary = (expenses, salary) => {
    const summary = {
      Needs: 0,
      Wants: 0,
    };
  
    expenses.forEach((exp) => {
      if (summary[exp.category] !== undefined) {
        summary[exp.category] += parseFloat(exp.amount);
      }
    });
  
    const totalSpent = summary.Needs + summary.Wants;
    const savings = Math.max(0, salary - totalSpent);
  
    return {
      needs: summary.Needs,
      wants: summary.Wants,
      savings,
      total: totalSpent,
      remaining: savings,
      salary,
    };
  };
  