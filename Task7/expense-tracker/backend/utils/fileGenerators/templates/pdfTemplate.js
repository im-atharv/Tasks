export const getPDFHtml = (summary, expenses) => `
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    h1, h2 { text-align: center; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f4f4f4; }
    .summary-table {
      margin: 10px auto 30px auto;
      width: 60%;
    }
  </style>
</head>
<body>
  <h1>Expense Report</h1>
  <h2>Summary</h2>
  <table class="summary-table">
    ${Object.entries(summary).map(([key, value]) => `
      <tr><th>${key.replace(/([A-Z])/g, ' $1')}</th><td>${value || 0}</td></tr>
    `).join('')}
  </table>
  <h2>Detailed Expenses</h2>
  <table>
    <thead>
      <tr><th>Description</th><th>Amount</th><th>Category</th><th>Date</th></tr>
    </thead>
    <tbody>
      ${expenses.map(({ desc, amount, category, date }) => `
        <tr><td>${desc}</td><td>${amount}</td><td>${category}</td><td>${date}</td></tr>
      `).join('')}
    </tbody>
  </table>
</body>
</html>
`;
