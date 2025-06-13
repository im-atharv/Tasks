// controllers/authController.js
import { sendSuccess, sendError } from "../utils/helpers/responseHelpers.js";
import { registerUser, loginUser } from "../services/authService.js";

// Signup controller
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { user, token } = await registerUser({ name, email, password });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return sendSuccess(res, {
      id: user._id,
      name: user.name,
      email: user.email,
    }, 201);
  } catch (err) {
    return sendError(res, err.message, 400);
  }
};

// Login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser({ email, password });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return sendSuccess(res, {
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    return sendError(res, err.message, 400);
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = req.user; // populated by authMiddleware
    return sendSuccess(res, {
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    return sendError(res, "Unauthorized", 401);
  }
};

// Logout controller
export const logout = (req, res) => {
  res.clearCookie("token");
  return sendSuccess(res, "Logged out successfully");
};
