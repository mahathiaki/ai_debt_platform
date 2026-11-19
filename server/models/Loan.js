import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        loanName: {
            type: String,
            required: true,
        },

        bankName: {
            type: String,
            required: true,
        },

        amount: {
            type: Number,
            required: true,
        },

        interestRate: {
            type: Number,
            required: true,
        },

        monthlyEMI: {
            type: Number,
            required: true,
        },

        duration: {
            type: Number,
            required: true,
        },

        startDate: {
            type: Date,
            required: true,
        },

        dueDate: {
            type: Date,
            required: true,
        },

        status: {
            type: String,
            default: "Active",
        },
    },
    {
        timestamps: true,
    }
);

const Loan = mongoose.model("Loan", loanSchema);

export default Loan;