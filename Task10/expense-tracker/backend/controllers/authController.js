// controllers/authController.js

// Reusable response helpers for success and error formatting
import { sendSuccess, sendError } from "../utils/helpers/responseHelpers.js";

// Auth-related business logic (register & login)
import { registerUser, loginUser } from "../services/authService.js";

/**
 * Signup Controller
 * Handles user registration.
 * - Extracts user data from request body
 * - Calls registerUser() service to create a user and generate JWT
 * - Sets HttpOnly cookie with JWT token
 * - Returns user data (excluding password) in response
 */
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Create user and generate JWT //Destructure inside object
    const { user, token } = await registerUser({ name, email, password });

    // Store JWT token in HttpOnly cookie (prevents XSS access)
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax", // Helps with CSRF protection while allowing same-site navigation
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7-day expiration
    });

    // Send success response with user info (excluding token & password)
    return sendSuccess(res, {
      id: user._id,
      name: user.name,
      email: user.email,
    }, 201);

  } catch (err) {
    // Error during signup
    return sendError(res, err.message, 400);
  }
};

/**
 * Login Controller
 * Handles user authentication.
 * - Validates user credentials via loginUser()
 * - If successful, sets JWT token in cookie
 * - Returns user info
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Authenticate user and get JWT token
    const { user, token } = await loginUser({ email, password });

    // Store token securely in cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Return basic user info
    return sendSuccess(res, {
      id: user._id,
      name: user.name,
      email: user.email,
    });

  } catch (err) {
    // Invalid credentials or error during login
    return sendError(res, err.message, 400);
  }
};

/**
 * Get Profile Controller
 * Returns authenticated user's profile.
 * - Assumes req.user is populated by auth middleware after token verification
 */
export const getProfile = async (req, res) => {
  try {
    const user = req.user; // Populated in middleware from JWT token

    return sendSuccess(res, {
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    return sendError(res, "Unauthorized", 401);
  }
};

/**
 * Logout Controller
 * - Clears the token cookie from the browser
 * - Returns success message
 */
export const logout = (req, res) => {
  res.clearCookie("token"); // Remove JWT from cookies
  return sendSuccess(res, "Logged out successfully");
};
