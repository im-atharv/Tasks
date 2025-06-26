import Order from "../models/Order.js";
import { orderSchema } from "../validators/orderValidator.js";
import bcrypt from "bcrypt";

export const saveOrder = async (req, res) => {
    try {
        const parsedData = orderSchema.parse(req.body);
        const hashedPassword = await bcrypt.hash(parsedData.password, 10);
        parsedData.password = hashedPassword;

        const newOrder = new Order(parsedData);
        await newOrder.save();

        res.status(201).json({ message: "Order saved successfully" });
    } catch (error) {
        if (error.name === "ZodError") {
            return res.status(400).json({ error: error.errors });
        }
        console.error("Error saving order:", error);
        res.status(500).json({ error: "Failed to save order" });
    }
};