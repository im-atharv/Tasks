import { z } from "zod";
import { RADIO_TECH_OPTIONS, DATA_USAGE_OPTIONS } from "./constants.js";

export const checkoutSchema = z.object({
    fullName: z.string().min(3, "Full name is required"),
    email: z.string().email("Invalid email").min(1, "Email required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),

    // ✅ Separate ZIP validations
    addressZip: z.string().regex(/^\d{5,6}$/, "ZIP must be 5 or 6 digits"),
    cardZip: z.string().regex(/^\d{5,6}$/, "ZIP must be 5 or 6 digits"),

    usage: z.enum(["personal", "commercial"], {
        errorMap: () => ({ message: "Select usage type" }),
    }),

    cardNumber: z
        .string()
        .min(16, "Must be 16 digits")
        .regex(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, "Enter in xxxx xxxx xxxx xxxx format"),

    expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
        message: "Expiry must be in MM/YY format",
    }),

    cvv: z.string().length(3, "CVV must be 3 digits"),

    radioTech: z.array(z.enum(RADIO_TECH_OPTIONS)).nonempty("Select at least one"),

    dataUsage: z.enum(DATA_USAGE_OPTIONS, {
        errorMap: () => ({ message: "Select a data range" }),
    }),

    promoCode: z.string().optional(),
});
