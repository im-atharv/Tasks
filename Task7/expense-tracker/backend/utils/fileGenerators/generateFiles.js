import { generatePDFBuffer } from "../fileGenerators/files/generatePDF.js";
import { generateExcelBuffer } from "../fileGenerators/files/generateExcel.js";

export async function generateFile(type, summary, expenses) {
  if (type === "pdf") {
    return await generatePDFBuffer(summary, expenses);
  } else if (type === "excel") {
    return await generateExcelBuffer(summary, expenses);
  } else {
    throw new Error(`Unsupported file type: ${type}`);
  }
}
