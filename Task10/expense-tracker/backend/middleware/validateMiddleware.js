// middleware/validate.js

// Standardized error response helper
import { sendError } from "../utils/helpers/responseHelpers.js";

/**
 * Generic Request Body Validator Middleware for User Details
 *
 * This is a reusable middleware generator that:
 * - Accepts a Zod schema
 * - Parses and validates `req.body` using the schema
 * - Replaces `req.body` with the validated data
 * - Sends a 400 Bad Request with structured error details on failure
 *
 * Usage:
 *   router.post("/route", validate(someZodSchema), controllerFunction);
 */
export const validate = (schema) => (req, res, next) => {
  try {
    // Parse and validate request body
    req.body = schema.parse(req.body);

    // If successful, pass control to the next middleware/controller
    next();
  } catch (err) {
    if (err.name === "ZodError") {
      // If it's a Zod validation error, format the error messages
      const errors = err.errors.map((e) => ({
        path: e.path.join("."),  // e.g., "user.email"
        message: e.message,      // e.g., "Email is required"
      }));
      return sendError(res, errors, 400);
    }

    // Fallback for unexpected internal errors
    return sendError(res, "Internal Server Error", 500);
  }
};
