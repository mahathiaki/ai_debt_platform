import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";
import Loan from "../models/Loan.js";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export const analyzeDebt = async (req, res) => {
    try {
        const loans = await Loan.find();

        if (loans.length === 0) {
            return res.json({
                success: false,
                message: "No loans found.",
            });
        }

        const loanDetails = loans
            .map(
                (loan) =>
                    `Loan: ${loan.loanName}
Bank: ${loan.bankName}
Amount: ₹${loan.amount}
Interest Rate: ${loan.interestRate}%
Monthly EMI: ₹${loan.monthlyEMI}
Duration: ${loan.duration} months`
            )
            .join("\n\n");

        const prompt = `
You are a financial advisor.

Analyze these loans:

${loanDetails}

Give:

1. Highest interest loan
2. Best repayment strategy
3. Estimated savings
4. Financial advice

Keep the response short and professional.
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        res.json({
            success: true,
            analysis: response.text,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "AI Analysis Failed",
        });
    }
};