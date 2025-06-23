export const getSummaryFromExpenses = (salary, expenses) => {
    const needs = expenses
      .filter((e) => e.category === "Needs")
      .reduce((sum, e) => sum + e.amount, 0);
  
    const wants = expenses
      .filter((e) => e.category === "Wants")
      .reduce((sum, e) => sum + e.amount, 0);
  
    const total = needs + wants ;
    const remaining = Math.max(salary - total, 0);
    const savings = remaining;
  
    return {
      salary,      // number ✅
      needs,       // number ✅
      wants,       // number ✅
      savings,     // number ✅
      total,       // number ✅
      remaining    // number ✅
    };
  };