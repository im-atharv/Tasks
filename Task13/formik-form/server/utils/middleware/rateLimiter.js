// utils/middleware/rateLimiter.js
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
dotenv.config();
export const rateLimiter = rateLimit({
    windowMs: process.env.TIME * 60 * 1000, // 1 minute
    max: process.env.MAX,
    message: {
        "Too Many Requests": "You have exceeded the request limit. Please try again later."
    }
});
