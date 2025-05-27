const puppeteer = require("puppeteer");
const { getPDFHtml } = require("../templates/pdfTemplate");

exports.generatePDFBuffer = async (summary, expenses) => {
  const html = getPDFHtml(summary, expenses);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
  await browser.close();
  return pdfBuffer;
};
