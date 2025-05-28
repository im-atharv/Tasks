import { exportRequestSchema, exportQuerySchema } from "../utils/validations/validationSchemas.js";
import { sendResponse } from "../utils/responseHelpers.js";

const validateExportRequest = (req, res, next) => {
  try {
    const validatedBody = exportRequestSchema.parse(req.body);
    const validatedQuery = exportQuerySchema.parse(req.query);

    req.validatedData = validatedBody;
    req.validatedQuery = validatedQuery;

    next();
  } catch (err) {
    return sendResponse(res, {
      status: 400,
      error: err.errors?.[0]?.message || "Invalid input data",
    });
  }
};

export default validateExportRequest;
