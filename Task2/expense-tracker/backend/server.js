const app = require("./app");

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Expense Tracker Backend running on http://localhost:${PORT}`);
});
