import { generatePDFBuffer } from "./files/generatePDF.js";
import { generateExcelBuffer } from "./files/generateExcel.js";

export async function generateFile(type, summary, expenses) {
  switch (type) {
    case "pdf":
      return await generatePDFBuffer(summary, expenses);
    case "excel":
      return await generateExcelBuffer(summary, expenses);
    default:
      throw new Error(`Unsupported file type: ${type}`);
  }
}
