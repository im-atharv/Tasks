import express from "express";
import {
  signup,
  login,
  logout,
  getProfile, // ✅
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";
import {
  loginSchema,
  signupSchema,
} from "../utils/validations/validationSchemas.js";

const router = express.Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);
router.get("/login", authMiddleware, getProfile); // ✅ used on refresh
router.post("/logout", logout);

export default router;
