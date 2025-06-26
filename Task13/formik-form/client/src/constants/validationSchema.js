import { z } from "zod";
import {
    RADIO_TECH_OPTIONS,
    DATA_USAGE_OPTIONS,
} from "./radioTechOptions";

// --------------------
// ✅ REGEX CONSTANTS
// --------------------
const ZIP_REGEX = /^\d{5,6}$/;
const NAME_REGEX = /^[A-Za-z\s]+$/;

// --------------------
// ✅ CHECKOUT SCHEMA
// --------------------
export const checkoutSchema = z.object({
    firstName: z
        .string()
        .regex(NAME_REGEX, "First name must contain only letters")
        .min(3, "First name is required (Min 3 letters)"),

    lastName: z
        .string()
        .regex(NAME_REGEX, "Last name must contain only letters")
        .min(3, "Last name is required (Min 3 letters)"),

    email: z
        .string()
        .email("Invalid email")
        .min(1, "Email is required"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),

    streetAddress: z
        .string()
        .min(5, "Street address is required"),

    apartment: z.string().optional(),

    country: z
        .string()
        .min(1, "Country is required"),

    state: z
        .string()
        .min(1, "State is required"),

    city: z
        .string()
        .min(1, "City is required"),

    addressZip: z
        .string()
        .regex(ZIP_REGEX, "ZIP must be 5 or 6 digits"),

    radioTech: z.enum(RADIO_TECH_OPTIONS, {
        errorMap: () => ({ message: "Select a valid network type" }),
    }),

    dataUsage: z
        .array(z.enum(DATA_USAGE_OPTIONS, {
            errorMap: () => ({ message: "Invalid data usage selection" }),
        }))
        .nonempty("Select at least one data usage option"),

    promoCode: z.string().optional(),

    calculatedPrice: z
        .number()
        .min(1, "Price must be at least ₹1"),
});
