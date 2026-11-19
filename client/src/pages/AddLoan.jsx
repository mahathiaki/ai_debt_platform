import "./AddLoan.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addLoan } from "../services/loanService";

import {
    FaRobot,
    FaChartLine,
    FaMoneyBillWave,
} from "react-icons/fa";

function AddLoan() {
    const navigate = useNavigate();

    const [loan, setLoan] = useState({
        loanName: "",
        bankName: "",
        amount: "",
        interestRate: "",
        monthlyEMI: "",
        duration: "",
        startDate: "",
        dueDate: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setLoan({
            ...loan,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !loan.loanName ||
            !loan.bankName ||
            !loan.amount ||
            !loan.interestRate ||
            !loan.monthlyEMI ||
            !loan.duration ||
            !loan.startDate ||
            !loan.dueDate
        ) {
            alert("Please fill all fields.");
            return;
        }

        try {
            setLoading(true);

            await addLoan({
                user: "684000000000000000000001", // Temporary (will use logged-in user later)
                loanName: loan.loanName,
                bankName: loan.bankName,
                amount: Number(loan.amount),
                interestRate: Number(loan.interestRate),
                monthlyEMI: Number(loan.monthlyEMI),
                duration: Number(loan.duration),
                startDate: loan.startDate,
                dueDate: loan.dueDate,
            });

            toast.success("Loan Added Successfully");

            navigate("/myloans");
        } catch (error) {
            console.error(error);
            toast.error("Unable to add loan");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="loan-page">

            <div className="loan-container">

                {/* LEFT SIDE */}

                <div className="loan-left">

                    <h1>💰 Add New Loan</h1>

                    <p>
                        Add your loan details and let our AI analyze your debt,
                        suggest smarter repayment plans, and help you become debt free.
                    </p>

                    <div className="feature-card">
                        <FaRobot className="feature-icon" />

                        <div>
                            <h3>AI Debt Analysis</h3>
                            <p>Receive intelligent repayment suggestions.</p>
                        </div>
                    </div>

                    <div className="feature-card">
                        <FaChartLine className="feature-icon" />

                        <div>
                            <h3>EMI Prediction</h3>
                            <p>Estimate repayment duration automatically.</p>
                        </div>
                    </div>

                    <div className="feature-card">
                        <FaMoneyBillWave className="feature-icon" />

                        <div>
                            <h3>Save More Money</h3>
                            <p>Reduce interest with AI recommendations.</p>
                        </div>
                    </div>

                </div>

                {/* RIGHT SIDE */}

                <div className="loan-right">

                    <div className="loan-card">

                        <h2>Loan Details</h2>

                        <p>Enter your loan information below.</p>

                        <form onSubmit={handleSubmit}>

                            <div className="row">

                                <input
                                    type="text"
                                    name="loanName"
                                    placeholder="Loan Name"
                                    value={loan.loanName}
                                    onChange={handleChange}
                                />

                                <input
                                    type="text"
                                    name="bankName"
                                    placeholder="Bank Name"
                                    value={loan.bankName}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="row">

                                <input
                                    type="number"
                                    name="amount"
                                    placeholder="Loan Amount"
                                    value={loan.amount}
                                    onChange={handleChange}
                                />

                                <input
                                    type="number"
                                    name="interestRate"
                                    placeholder="Interest Rate (%)"
                                    value={loan.interestRate}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="row">

                                <input
                                    type="number"
                                    name="monthlyEMI"
                                    placeholder="Monthly EMI"
                                    value={loan.monthlyEMI}
                                    onChange={handleChange}
                                />

                                <input
                                    type="number"
                                    name="duration"
                                    placeholder="Duration (Months)"
                                    value={loan.duration}
                                    onChange={handleChange}
                                />

                            </div>

                            <label>Start Date</label>

                            <input
                                type="date"
                                name="startDate"
                                value={loan.startDate}
                                onChange={handleChange}
                            />

                            <label>Due Date</label>

                            <input
                                type="date"
                                name="dueDate"
                                value={loan.dueDate}
                                onChange={handleChange}
                            />

                            <button
                                type="submit"
                                disabled={loading}
                            >
                                {loading
                                    ? "Adding Loan..."
                                    : "🤖 Analyze & Add Loan"}
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AddLoan;