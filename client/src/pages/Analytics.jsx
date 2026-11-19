import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import DebtChart from "../charts/DebtChart";
import ProgressChart from "../charts/ProgressChart";
import { getLoans } from "../services/loanService";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./Analytics.css";

function Analytics() {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLoans();
    }, []);

    const fetchLoans = async () => {
        try {
            const data = await getLoans();

            if (data.success) {
                setLoans(data.loans);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const totalDebt = loans.reduce(
        (sum, loan) => sum + Number(loan.amount),
        0
    );

    const totalEMI = loans.reduce(
        (sum, loan) => sum + Number(loan.monthlyEMI),
        0
    );

    const averageInterest =
        loans.length > 0
            ? (
                loans.reduce(
                    (sum, loan) => sum + Number(loan.interestRate),
                    0
                ) / loans.length
            ).toFixed(2)
            : 0;

    const activeLoans = loans.filter(
        (loan) => loan.status === "Active"
    ).length;

    // PDF Download
    const downloadReport = () => {
        const doc = new jsPDF();

        doc.setFontSize(22);
        doc.text("AI Debt Relief Platform", 14, 18);

        doc.setFontSize(16);
        doc.text("Loan Analytics Report", 14, 30);

        doc.setFontSize(11);
        doc.text(
            `Generated On: ${new Date().toLocaleString()}`,
            14,
            40
        );

        doc.text(`Total Loans: ${loans.length}`, 14, 50);
        doc.text(`Active Loans: ${activeLoans}`, 14, 58);
        doc.text(`Total Debt: ₹${totalDebt.toLocaleString()}`, 14, 66);
        doc.text(`Total EMI: ₹${totalEMI.toLocaleString()}`, 14, 74);
        doc.text(`Average Interest: ${averageInterest}%`, 14, 82);

        autoTable(doc, {
            startY: 92,
            head: [[
                "Loan",
                "Bank",
                "Amount",
                "Interest",
                "EMI",
                "Status"
            ]],
            body: loans.map((loan) => [
                loan.loanName,
                loan.bankName,
                `₹${loan.amount.toLocaleString()}`,
                `${loan.interestRate}%`,
                `₹${loan.monthlyEMI.toLocaleString()}`,
                loan.status,
            ]),
        });

        doc.save("Debt-Relief-Report.pdf");
    };

    return (
        <Layout>
            <div className="analytics-page">

                <div className="analytics-header">

                    <div>
                        <h1>📊 Loan Analytics</h1>

                        <p>
                            Track your debt, EMIs, loan status and repayment insights.
                        </p>
                    </div>

                    <button
                        className="download-btn"
                        onClick={downloadReport}
                    >
                        📄 Download Report
                    </button>

                </div>

                {loading ? (
                    <h2>Loading Analytics...</h2>
                ) : (
                    <>
                        <div className="analytics-cards">

                            <div className="analytics-card">
                                <h3>Total Debt</h3>
                                <h2>₹{totalDebt.toLocaleString()}</h2>
                            </div>

                            <div className="analytics-card">
                                <h3>Total EMI</h3>
                                <h2>₹{totalEMI.toLocaleString()}</h2>
                            </div>

                            <div className="analytics-card">
                                <h3>Active Loans</h3>
                                <h2>{activeLoans}</h2>
                            </div>

                            <div className="analytics-card">
                                <h3>Average Interest</h3>
                                <h2>{averageInterest}%</h2>
                            </div>

                        </div>

                        <div className="chart-grid">

                            <div className="chart-box">
                                <h2>Debt Distribution</h2>
                                <DebtChart loans={loans} />
                            </div>

                            <div className="chart-box">
                                <h2>Repayment Progress</h2>
                                <ProgressChart loans={loans} />
                            </div>

                        </div>

                        <div className="loan-summary">

                            <h2>Loan Summary</h2>

                            <table>

                                <thead>
                                    <tr>
                                        <th>Loan</th>
                                        <th>Bank</th>
                                        <th>Amount</th>
                                        <th>Interest</th>
                                        <th>EMI</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {loans.map((loan) => (

                                        <tr key={loan._id}>
                                            <td>{loan.loanName}</td>
                                            <td>{loan.bankName}</td>
                                            <td>₹{loan.amount.toLocaleString()}</td>
                                            <td>{loan.interestRate}%</td>
                                            <td>₹{loan.monthlyEMI.toLocaleString()}</td>
                                            <td>{loan.status}</td>
                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>
                    </>
                )}

            </div>
        </Layout>
    );
}

export default Analytics;