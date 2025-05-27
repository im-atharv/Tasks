import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import exportRoutes from "./routes/exportRoutes.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Expense Tracker Backend is running");
});

app.use("/api/export", exportRoutes);

export default app;