// models/User.js

import mongoose from "mongoose";

/**
 * User Schema (MongoDB - Mongoose)
 *
 * Stores authentication-related user details.
 * This model is used for login, signup, and JWT-based session validation.
 */

const userSchema = new mongoose.Schema({
  // User's full name
  name: { type: String, required: true },

  // Unique email used for authentication
  email: { type: String, required: true, unique: true },

  // Hashed password for secure login
  password: { type: String, required: true },
});

export default mongoose.model("User", userSchema);
