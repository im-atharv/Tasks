import mongoose from "mongoose";
import { RADIO_TECH_OPTIONS } from "../constants.js";

const orderSchema = new mongoose.Schema({
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    streetAddress: { type: String, required: true },
    apartment: { type: String, default: "" },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    addressZip: { type: String, required: true },

    radioTech: {
        type: String,
        required: [true, "Select a valid network type"],
        enum: {
            values: RADIO_TECH_OPTIONS,
            message: "Select a valid network type (2G, 3G, 4G, or 5G)",
        },
    },

    dataUsage: {
        type: [String],
        required: true,
        validate: {
            validator: (val) => val.length > 0,
            message: "Select at least one data usage option",
        },
    },

    promoCode: { type: String, default: "" },
    calculatedPrice: { type: Number, required: true, min: 1 },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
