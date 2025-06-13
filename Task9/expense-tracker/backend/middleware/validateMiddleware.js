import { sendError } from "../utils/helpers/responseHelpers.js";

export const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    if (err.name === "ZodError") {
      const errors = err.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      }));
      return sendError(res, errors, 400);
    }
    return sendError(res, "Internal Server Error", 500);
  }
};
