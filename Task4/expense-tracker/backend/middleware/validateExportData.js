import { exportRequestSchema } from "../validators/exportSchema.js";

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

export default validateExportRequest;