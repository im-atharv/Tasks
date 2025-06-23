// middleware/authMiddleware.js

// JSON Web Token package to verify authentication tokens
import jwt from "jsonwebtoken";

// Reusable error response helper
import { sendError } from "../utils/helpers/responseHelpers.js";

/**
 * Authentication Middleware
 * This middleware protects routes by verifying the user's JWT token stored in cookies.
 *
 * Flow:
 * 1. Reads the token from `req.cookies.token`
 * 2. Verifies the token using the server-side `JWT_SECRET`
 * 3. If valid, adds `userId` to the request object and proceeds
 * 4. If missing or invalid, sends a 401 Unauthorized response
 */
const requireAuth = (req, res, next) => {
  const token = req.cookies?.token; // Read token from HTTP-only cookie

  // No token means user is not logged in
  if (!token) return sendError(res, "Unauthorized", 401);

  try {
    // Verify token and extract payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach userId to request object for use in controllers/services
    req.userId = decoded.userId;

    // Continue to the next middleware or route handler
    next();
  } catch (err) {
    // Token is invalid or expired
    return sendError(res, "Invalid token", 401);
  }
};

export default requireAuth;
