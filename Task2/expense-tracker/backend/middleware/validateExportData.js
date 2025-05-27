const { exportRequestSchema } = require("../validators/exportSchema");

const validateExportRequest = (req, res, next) => {
  const validation = exportRequestSchema.safeParse(req.body);
  if (!validation.success) {
    const errors = validation.error.issues.map(
      (issue) => `${issue.path.join(".")}: ${issue.message}`
    );
    return res.status(400).json({ error: errors.join(", ") });
  }

  req.validatedData = validation.data;
  next();
};

module.exports = validateExportRequest;
