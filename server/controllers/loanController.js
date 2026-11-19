import Loan from "../models/Loan.js";

// Add Loan
export const addLoan = async (req, res) => {
    try {
        const loan = await Loan.create({
            ...req.body,
            user: req.user.id,
        });

        res.status(201).json({
            success: true,
            message: "Loan Added Successfully",
            loan,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Logged-in User Loans
export const getLoans = async (req, res) => {
    try {
        const loans = await Loan.find({
            user: req.user.id,
        }).sort({ createdAt: -1 });

        res.json({
            success: true,
            loans,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Loan
export const updateLoan = async (req, res) => {
    try {
        const loan = await Loan.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!loan) {
            return res.status(404).json({
                success: false,
                message: "Loan not found",
            });
        }

        Object.assign(loan, req.body);

        await loan.save();

        res.json({
            success: true,
            message: "Loan Updated Successfully",
            loan,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Loan
export const deleteLoan = async (req, res) => {
    try {
        const loan = await Loan.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!loan) {
            return res.status(404).json({
                success: false,
                message: "Loan not found",
            });
        }

        res.json({
            success: true,
            message: "Loan Deleted Successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};