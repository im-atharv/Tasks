// routes/authRoutes.js

import express from "express";
import { signup, login, logout, getProfile } from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";
import { loginSchema, signupSchema } from "../utils/validations/validationSchemas.js";

const router = express.Router();

/**
 * Auth Routes
 * 
 * Handles user authentication and session management:
 * - POST /signup → Create new user
 * - POST /login  → Authenticate user & set HttpOnly cookie
 * - GET /login   → Returns user profile if JWT is valid (used for persistent login)
 * - POST /logout → Clears cookie & ends session
 */

// Register new user (validation using Zod schema)
router.post("/signup", validate(signupSchema), signup);

// Authenticate user and set JWT cookie
router.post("/login", validate(loginSchema), login);

// Persistent login (called on frontend refresh to validate user session and get User Details)
router.get("/login", authMiddleware, getProfile);

// router.route("/login")
//   .post(validate(loginSchema), login)
//   .get(authMiddleware, getProfile);

// Clear token cookie and logout
router.post("/logout", logout);

export default router;
