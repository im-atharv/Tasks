const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const XLSX = require("xlsx");
const puppeteer = require("puppeteer");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Expense Tracker Backend is running");
});

app.post("/api/export", async (req, res) => {
  const { type } = req.query; // Accepts 'pdf' or 'excel'
  const expenses = req.body.expenses || [];
  const summary = req.body.summary || {};

  console.log(`[API HIT] /api/export?type=${type} - Generating ${type?.toUpperCase()} File`);

  if (!type || !["pdf", "excel"].includes(type)) {
    return res.status(400).send("Invalid export type. Use '?type=pdf' or '?type=excel'");
  }

  try {
    if (type === "excel") {
      const workbook = XLSX.utils.book_new();

      // Sheet 1: Expenses
      const expenseSheet = XLSX.utils.json_to_sheet(expenses);
      XLSX.utils.book_append_sheet(workbook, expenseSheet, "Expenses");

      // Sheet 2: Summary
      const summarySheetData = [
        ["Monthly Salary", summary.salary || 0],
        ["Total Needs", summary.needs || 0],
        ["Total Wants", summary.wants || 0],
        ["Total Savings", summary.savings || 0],
        ["Total Expenses", summary.total || 0],
        ["Remaining Budget", summary.remaining || 0]
      ];
      const summarySheet = XLSX.utils.aoa_to_sheet(summarySheetData);
      XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");

      const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

      // Generalized header for Excel
      res.setHeader("Content-Disposition", "attachment; filename=expenses.xlsx");
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      return res.send(buffer);
    }

    if (type === "pdf") {
      const html = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1, h2 { text-align: center; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f4f4f4; }
              .summary-table {
                margin-top: 10px;
                margin-bottom: 30px;
                width: 60%;
                margin-left: auto;
                margin-right: auto;
              }
            </style>
          </head>
          <body>
            <h1>Expense Report</h1>

            <h2>Summary</h2>
            <table class="summary-table">
              <tr><th>Monthly Salary</th><td>${summary.salary || 0}</td></tr>
              <tr><th>Total Needs</th><td>${summary.needs || 0}</td></tr>
              <tr><th>Total Wants</th><td>${summary.wants || 0}</td></tr>
              <tr><th>Total Savings</th><td>${summary.savings || 0}</td></tr>
              <tr><th>Total Expenses</th><td>${summary.total || 0}</td></tr>
              <tr><th>Remaining Budget</th><td>${summary.remaining || 0}</td></tr>
            </table>

            <h2>Detailed Expenses</h2>
            <table>
              <thead>
                <tr><th>Description</th><th>Amount</th><th>Category</th><th>Date</th></tr>
              </thead>
              <tbody>
                ${expenses.map(({ desc, amount, category, date }) => `
                  <tr>
                    <td>${desc}</td>
                    <td>${amount}</td>
                    <td>${category}</td>
                    <td>${date}</td>
                  </tr>`).join("")}
              </tbody>
            </table>
          </body>
        </html>
      `;

      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: "networkidle0" });

      const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
      await browser.close();

      // Generalized header for PDF
      res.setHeader("Content-Disposition", "attachment; filename=expenses.pdf");
      res.setHeader("Content-Type", "application/pdf");
      return res.send(pdfBuffer);
    }
  } catch (error) {
    console.error(`Error generating ${type.toUpperCase()}:`, error);
    res.status(500).send(`Failed to generate ${type.toUpperCase()} file`);
  }
});

app.listen(4000, () => {
  console.log(" Expense Tracker Backend running on http://localhost:4000");
});
