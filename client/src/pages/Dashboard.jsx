import "./Dashboard.css";
import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";

import DebtChart from "../charts/DebtChart";
import ProgressChart from "../charts/ProgressChart";
import AIInsights from "../components/AIInsights";
import UpcomingEMI from "../components/UpcomingEMI";

import { getLoans } from "../services/loanService";

import {
    FaWallet,
    FaMoneyBillWave,
    FaChartLine,
    FaStar,
    FaPlus,
    FaRobot,
    FaFileInvoice,
    FaArrowUp,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLoans();
    }, []);

    const fetchLoans = async () => {

        try {

            const data = await getLoans();

            setLoans(data.loans);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    const totalDebt = loans.reduce(
        (sum, loan) => sum + loan.amount,
        0
    );

    const totalEMI = loans.reduce(
        (sum, loan) => sum + loan.monthlyEMI,
        0
    );

    const avgInterest =
        loans.length > 0
            ? (
                loans.reduce(
                    (sum, loan) => sum + loan.interestRate,
                    0
                ) / loans.length
            ).toFixed(1)
            : 0;

    const creditScore = 760;

    return (

        <Layout>

            <div className="dashboard-page">

                {/* Header */}

                <div className="dashboard-header">

                    <div>

                        <h1>
                            Welcome Back 👋
                        </h1>

                        <p>
                            Here's your latest financial overview.
                        </p>

                    </div>

                    <div className="header-actions">

                        <button
                            className="primary-btn"
                            onClick={() => navigate("/addloan")}
                        >
                            <FaPlus />
                            Add Loan
                        </button>

                    </div>

                </div>

                {/* Cards */}

                <div className="stats-grid">

                    <div className="stat-card blue">

                        <div>

                            <p>Total Debt</p>

                            <h2>
                                ₹{totalDebt.toLocaleString()}
                            </h2>

                        </div>

                        <FaWallet className="stat-icon" />

                    </div>

                    <div className="stat-card green">

                        <div>

                            <p>Monthly EMI</p>

                            <h2>
                                ₹{totalEMI.toLocaleString()}
                            </h2>

                        </div>

                        <FaMoneyBillWave className="stat-icon" />

                    </div>

                    <div className="stat-card purple">

                        <div>

                            <p>Active Loans</p>

                            <h2>{loans.length}</h2>

                        </div>

                        <FaChartLine className="stat-icon" />

                    </div>

                    <div className="stat-card orange">

                        <div>

                            <p>Credit Score</p>

                            <h2>{creditScore}</h2>

                        </div>

                        <FaStar className="stat-icon" />

                    </div>

                </div>

                {/* Charts */}

                <div className="chart-grid">

                    <div className="chart-card">

                        <h2>Debt Distribution</h2>

                        <DebtChart loans={loans} />

                    </div>

                    <div className="chart-card">

                        <h2>Repayment Progress</h2>

                        <ProgressChart loans={loans} />

                    </div>

                </div>

                {/* Quick Actions */}

                <div className="quick-actions">

                    <button onClick={() => navigate("/addloan")}>

                        <FaPlus />

                        Add Loan

                    </button>

                    <button onClick={() => navigate("/myloans")}>

                        <FaFileInvoice />

                        My Loans

                    </button>

                    <button onClick={() => navigate("/ai-analysis")}>

                        <FaRobot />

                        AI Analysis

                    </button>

                    <button>

                        <FaChartLine />

                        Analytics

                    </button>

                </div>

                {/* AI Recommendation */}

                <div className="recommendation-card">

                    <div className="recommendation-header">

                        <FaRobot />

                        <h2>AI Recommendation</h2>

                    </div>

                    <p>

                        Based on your current loans, your average interest rate is
                        <strong> {avgInterest}%</strong>.

                        Prioritize loans with the highest interest rate first to
                        reduce your overall repayment cost.

                    </p>

                </div>
                {/* Middle Section */}

                <div className="dashboard-middle">

                    <div className="left-section">

                        <AIInsights loans={loans} />

                        <UpcomingEMI loans={loans} />

                    </div>

                    <div className="right-section">

                        <div className="activity-card">

                            <h2>Recent Activity</h2>

                            {loading ? (

                                <p>Loading...</p>

                            ) : loans.length === 0 ? (

                                <p>No recent activity.</p>

                            ) : (

                                <ul>

                                    {loans
                                        .slice()
                                        .reverse()
                                        .slice(0, 5)
                                        .map((loan) => (

                                            <li key={loan._id}>

                                                <div className="activity-icon">

                                                    <FaArrowUp />

                                                </div>

                                                <div>

                                                    <h4>{loan.loanName}</h4>

                                                    <span>
                                                        ₹{loan.amount.toLocaleString()} • {loan.bankName}
                                                    </span>

                                                </div>

                                            </li>

                                        ))}

                                </ul>

                            )}

                        </div>

                        <div className="summary-card-dashboard">

                            <h2>Financial Summary</h2>

                            <div className="summary-row">

                                <span>Total Debt</span>

                                <strong>
                                    ₹{totalDebt.toLocaleString()}
                                </strong>

                            </div>

                            <div className="summary-row">

                                <span>Total EMI</span>

                                <strong>
                                    ₹{totalEMI.toLocaleString()}
                                </strong>

                            </div>

                            <div className="summary-row">

                                <span>Active Loans</span>

                                <strong>{loans.length}</strong>

                            </div>

                            <div className="summary-row">

                                <span>Average Interest</span>

                                <strong>{avgInterest}%</strong>

                            </div>

                            <div className="summary-row">

                                <span>Credit Score</span>

                                <strong>{creditScore}</strong>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </Layout>

    );

}

export default Dashboard;