import { z } from "zod";
import { RADIO_TECH_OPTIONS, DATA_USAGE_OPTIONS } from "./constants.js";

// --------------------
// ✅ REGEX CONSTANTS
// --------------------
const ZIP_REGEX = /^\d{5,6}$/;
const NAME_REGEX = /^[A-Za-z\s]+$/;
const CARD_NUMBER_REGEX = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
const EXPIRY_REGEX = /^(0[1-9]|1[0-2])\/\d{2}$/;
const CVV_REGEX = /^\d{3}$/;

// --------------------
// ✅ SCHEMA
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
        .min(1, "Email required"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),

    streetAddress: z
        .string()
        .min(5, "Address is required"),

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

    cardZip: z
        .string()
        .regex(ZIP_REGEX, "ZIP must be 5 or 6 digits"),

    usage: z.enum(["personal", "commercial"], {
        errorMap: () => ({ message: "Select usage type" }),
    }),

    cardNumber: z
        .string()
        .min(19, "Must be 16 digits")
        .regex(CARD_NUMBER_REGEX, "Enter in xxxx xxxx xxxx xxxx format"),

    expiry: z
        .string()
        .regex(EXPIRY_REGEX, "Expiry must be in MM/YY format"),

    cvv: z
        .string()
        .regex(CVV_REGEX, "CVV must be 3 digits"),

    radioTech: z
        .array(z.enum(RADIO_TECH_OPTIONS))
        .nonempty("Select at least one"),

    dataUsage: z.enum(DATA_USAGE_OPTIONS, {
        errorMap: () => ({ message: "Select a data range" }),
    }),

    promoCode: z.string().optional(),
});
