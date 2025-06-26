import express from "express";
import { saveOrder } from "../controllers/orderController.js";

const router = express.Router();
router.post("/submit", saveOrder);
export default router;