// Import necessary packages
const express = require("express"); // Express framework for building APIs
const cors = require("cors"); // Enables Cross-Origin Resource Sharing
const bodyParser = require("body-parser"); // Parses incoming request bodies
const XLSX = require("xlsx"); // Library for working with Excel files
const puppeteer = require("puppeteer"); // Headless browser for generating PDFs from HTML
const exportRequestSchema = require("./validator"); // Zod schema for validating request data

// Create an Express app
const app = express();

// Enable CORS and parse incoming JSON request bodies
app.use(cors());
app.use(bodyParser.json());

// Test route to check if backend is running
app.get("/", (req, res) => {
  res.send("Expense Tracker Backend is running");
});

// POST route to export data as Excel or PDF
app.post("/api/export", async (req, res) => {
  const { type } = req.query; // Get the export type from query string (?type=pdf or ?type=excel)

  console.log(`[API HIT] /api/export?type=${type} - Generating ${type?.toUpperCase()} File`);

  // Validate export type
  if (!type || !["pdf", "excel"].includes(type)) {
    return res.status(400).send("Invalid export type. Use '?type=pdf' or '?type=excel'");
  }

  // Validate the request body using Zod schema
  const parseResult = exportRequestSchema.safeParse(req.body);
  if (!parseResult.success) {
    // Return detailed error messages if validation fails
    const errorMessages = parseResult.error.issues.map(issue => ({
      path: issue.path.join("."),
      message: issue.message
    }));
    return res.status(400).json({ errors: errorMessages });
  }

  // Destructure validated data
  const { expenses, summary } = parseResult.data;

  try {
    // === EXCEL EXPORT LOGIC ===
    if (type === "excel") {
      const workbook = XLSX.utils.book_new(); // Create a new workbook

      // Convert expenses array to a sheet
      const expenseSheet = XLSX.utils.json_to_sheet(expenses);
      XLSX.utils.book_append_sheet(workbook, expenseSheet, "Expenses");

      // Create a summary sheet with key values
      const summarySheetData = [
        ["Monthly Salary", summary.salary || 0],
        ["Total Needs", summary.needs || 0],
        ["Total Wants", summary.wants || 0],
        ["Total Savings", summary.savings || 0],
        ["Total Expenses", summary.total || 0],
        ["Remaining Budget", summary.remaining || 0],
      ];
      const summarySheet = XLSX.utils.aoa_to_sheet(summarySheetData); // Convert array of arrays to sheet
      XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");

      // Convert workbook to a buffer
      const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

      // Set response headers and send the file
      res.setHeader("Content-Disposition", "attachment; filename=expenses.xlsx");
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      return res.send(buffer);
    }

    // === PDF EXPORT LOGIC ===
    if (type === "pdf") {
      // Create HTML template for the PDF
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

      // Launch Puppeteer to generate PDF
      const browser = await puppeteer.launch(); // Launch headless browser
      const page = await browser.newPage(); // Open a new page
      await page.setContent(html, { waitUntil: "networkidle0" }); // Load the HTML content

      // Generate PDF from page content
      const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
      await browser.close(); // Close browser after PDF generation

      // Set response headers and send the PDF
      res.setHeader("Content-Disposition", "attachment; filename=expenses.pdf");
      res.setHeader("Content-Type", "application/pdf");
      return res.send(pdfBuffer);
    }

  } catch (error) {
    // Handle and log any server errors
    console.error(`Error generating ${type.toUpperCase()}:`, error);
    res.status(500).send(`Failed to generate ${type.toUpperCase()} file`);
  }
});

// Start the server on port 4000
app.listen(4000, () => {
  console.log("✅ Expense Tracker Backend running on http://localhost:4000");
});
