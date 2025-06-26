import { z } from "zod";
import {
    DATA_USAGE_OPTIONS,
    NAME_REGEX,
    RADIO_TECH_OPTIONS,
    ZIP_REGEX,
} from "../constants.js";

export const orderSchema = z.object({
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

    apartment: z
        .string()
        .optional()
        .nullable(),

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

    radioTech: z.enum([...RADIO_TECH_OPTIONS], {
        errorMap: () => ({ message: "Select a valid network type" }),
    }),

    dataUsage: z
        .array(z.enum([...DATA_USAGE_OPTIONS], {
            errorMap: () => ({ message: "Invalid data usage selection" }),
        }))
        .nonempty("Select at least one data usage option"),

    promoCode: z
        .string()
        .optional()
        .nullable(),

    calculatedPrice: z
        .number()
        .min(1, "Price must be at least ₹1"),
});
