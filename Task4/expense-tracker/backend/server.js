import app from "./app.js";

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`✅ Expense Tracker Backend running on http://localhost:${PORT}`);
});