// Import the Zod validation schema for export requests
const { exportRequestSchema } = require("../validators/exportSchema");

// Middleware function to validate export request body using Zod schema
const validateExportRequest = (req, res, next) => {
  // Validate the incoming request body against the schema
  const validation = exportRequestSchema.safeParse(req.body);

  // If validation fails, return a 400 error with detailed messages
  if (!validation.success) {
    const errors = validation.error.issues.map(
      (issue) => `${issue.path.join(".")}: ${issue.message}` // Format error messages
    );
    return res.status(400).json({ error: errors.join(", ") });
  }

  // Attach the validated data to the request object for further use
  req.validatedData = validation.data;

  // Proceed to the next middleware or route handler
  next();
};

// Export the middleware function
module.exports = validateExportRequest;
