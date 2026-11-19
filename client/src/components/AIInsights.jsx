import "./AIInsights.css";
import {
    FaRobot,
    FaArrowUp,
    FaMoneyBillWave,
    FaLightbulb,
    FaCheckCircle,
} from "react-icons/fa";

function AIInsights({ loans = [] }) {
    if (loans.length === 0) {
        return (
            <div className="ai-card">
                <div className="ai-header">
                    <FaRobot className="ai-icon" />
                    <div>
                        <h2>AI Insights</h2>
                        <p>Add loans to receive AI-powered recommendations.</p>
                    </div>
                </div>
            </div>
        );
    }

    const totalDebt = loans.reduce(
        (sum, loan) => sum + Number(loan.amount),
        0
    );

    const totalEMI = loans.reduce(
        (sum, loan) => sum + Number(loan.monthlyEMI),
        0
    );

    const highestInterestLoan = loans.reduce((prev, current) =>
        Number(prev.interestRate) > Number(current.interestRate)
            ? prev
            : current
    );

    const highestEMILoan = loans.reduce((prev, current) =>
        Number(prev.monthlyEMI) > Number(current.monthlyEMI)
            ? prev
            : current
    );

    const estimatedSaving = Math.round(
        highestInterestLoan.amount * 0.08
    );

    return (
        <div className="ai-card">

            <div className="ai-header">

                <FaRobot className="ai-icon" />

                <div>

                    <h2>AI Debt Insights</h2>

                    <p>
                        Smart recommendations based on your current loans.
                    </p>

                </div>

            </div>

            <div className="insight-grid">

                <div className="insight-box">

                    <FaMoneyBillWave className="small-icon" />

                    <div>

                        <span>Total Debt</span>

                        <h3>
                            ₹{totalDebt.toLocaleString()}
                        </h3>

                    </div>

                </div>

                <div className="insight-box">

                    <FaArrowUp className="small-icon" />

                    <div>

                        <span>Total EMI</span>

                        <h3>
                            ₹{totalEMI.toLocaleString()}
                        </h3>

                    </div>

                </div>

            </div>

            <div className="recommendation">

                <h3>

                    <FaLightbulb />

                    AI Recommendation

                </h3>

                <p>

                    Your highest interest loan is

                    <strong>
                        {" "}
                        {highestInterestLoan.loanName}
                    </strong>

                    {" "}with an interest rate of

                    <strong>
                        {" "}
                        {highestInterestLoan.interestRate}%
                    </strong>.

                </p>

                <p>

                    Consider paying an extra

                    <strong> ₹5,000</strong>

                    every month towards this loan using the

                    <strong> Debt Avalanche Strategy</strong>.

                </p>

                <p>

                    Estimated interest savings:

                    <strong>
                        {" "}
                        ₹{estimatedSaving.toLocaleString()}
                    </strong>

                </p>

            </div>

            <div className="loan-highlight">

                <FaCheckCircle className="highlight-icon" />

                <div>

                    <h4>Highest EMI Loan</h4>

                    <p>

                        {highestEMILoan.loanName}

                        {" • "}

                        ₹{highestEMILoan.monthlyEMI.toLocaleString()}

                        /month

                    </p>

                </div>

            </div>

        </div>
    );
}

export default AIInsights;