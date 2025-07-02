import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./config/db.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import webhookRoutes from "./routes/webhook.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.set("trust proxy", 1); // Trust first proxy for secure cookies

app.use("/stripe", bodyParser.raw({ type: "application/json" }), webhookRoutes);

app.use(express.json());
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));