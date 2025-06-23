import { generateFile } from "../utils/fileGenerators/generateFiles.js";
import  setFileHeaders  from "../utils/helpers/setFileHeaders.js";
import { sendError } from "../utils/helpers/responseHelpers.js";

export const exportData = async (req, res) => {
  try {
    const { expenses, summary } = req.body;
    const { type } = req.query;

    const fileBuffer = await generateFile(type, summary, expenses);

    setFileHeaders(res, type);
    return res.send(fileBuffer);
  } catch (error) {
    console.error("Export error:", error); // See what prints here
    return sendError(res, "Failed to generate export file", 500);
  }
};
