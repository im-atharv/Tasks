// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import { sendError } from "../utils/helpers/responseHelpers.js";

const requireAuth = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) return sendError(res, "Unauthorized", 401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return sendError(res, "Invalid token", 401);
  }
};

export default requireAuth;
