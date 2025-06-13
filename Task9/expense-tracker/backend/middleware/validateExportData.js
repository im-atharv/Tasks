import { exportRequestSchema, exportQuerySchema } from "../utils/validations/validationSchemas.js";
import { sendError } from "../utils/helpers/responseHelpers.js";

const validateExportRequest = (req, res, next) => {
  try {
    req.validatedData = exportRequestSchema.parse(req.body);
    req.validatedQuery = exportQuerySchema.parse(req.query);
    next();
  } catch (err) {
    const message =
      err?.errors?.[0]?.message || err?.message || "Invalid input data";
    return sendError(res, message, 400);
  }
};

export default validateExportRequest;
