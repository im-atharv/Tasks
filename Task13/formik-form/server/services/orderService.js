import Order from "../models/Order.js";
import { orderSchema } from "../validators/orderValidator.js";
import bcrypt from "bcrypt";

export const saveOrderService = async (orderData) => {
  // 1. Validate
  const parsedData = orderSchema.parse(orderData);

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(parsedData.password, 10);
  parsedData.password = hashedPassword;

  // 3. Save to DB
  const newOrder = new Order(parsedData);
  return await newOrder.save();
};
