import express from "express";
import { analyzeDebt } from "../controllers/aiController.js";

const router = express.Router();

router.get("/analyze", analyzeDebt);

export default router;