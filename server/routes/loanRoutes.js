import express from "express";

import {
    addLoan,
    getLoans,
    deleteLoan,
    updateLoan,
} from "../controllers/loanController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Add Loan
router.post("/", addLoan);

// Get All Loans
router.get("/", getLoans);

// Update Loan
router.put("/:id", updateLoan);

// Delete Loan
router.delete("/:id", deleteLoan);

export default router;