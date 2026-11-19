import "./MyLoans.css";
import { useEffect, useState } from "react";
import {
    FaUniversity,
    FaCar,
    FaGraduationCap,
    FaTrash,
    FaEye,
    FaSearch,
    FaPlus,
    FaEdit,
} from "react-icons/fa";

import { getLoans, deleteLoan } from "../services/loanService";
import { useNavigate } from "react-router-dom";
import LoanModal from "../components/LoanModal";
import { toast } from "react-toastify";

function MyLoans() {
    const navigate = useNavigate();

    const [loans, setLoans] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedLoan, setSelectedLoan] = useState(null);

    useEffect(() => {
        fetchLoans();
    }, []);

    const fetchLoans = async () => {
        try {
            const data = await getLoans();
            setLoans(data.loans || []);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this loan?")) return;

        try {
            await deleteLoan(id);
            toast.success("Loan Deleted Successfully");
            fetchLoans();
        } catch (error) {
            console.log(error);
            toast.error("Unable to delete loan");
        }
    };

    const getIcon = (loanName) => {
        if (!loanName) return <FaUniversity />;

        const name = loanName.toLowerCase();

        if (name.includes("car")) return <FaCar />;
        if (name.includes("education")) return <FaGraduationCap />;

        return <FaUniversity />;
    };

    const filteredLoans = loans.filter((loan) =>
        loan.loanName.toLowerCase().includes(search.toLowerCase())
    );

    const totalDebt = loans.reduce(
        (sum, loan) => sum + Number(loan.amount),
        0
    );

    const totalEMI = loans.reduce(
        (sum, loan) => sum + Number(loan.monthlyEMI),
        0
    );

    const avgInterest =
        loans.length > 0
            ? (
                loans.reduce(
                    (sum, loan) => sum + Number(loan.interestRate),
                    0
                ) / loans.length
            ).toFixed(1)
            : 0;

    return (
        <div className="loans-page">

            <div className="loans-header">
                <div>
                    <h1>💳 My Loans</h1>
                    <p>View, monitor and manage all your active loans.</p>
                </div>

                <button
                    className="add-loan-btn"
                    onClick={() => navigate("/addloan")}
                >
                    <FaPlus />
                    Add Loan
                </button>
            </div>

            <div className="summary-cards">

                <div className="summary-card">
                    <h3>Total Loans</h3>
                    <h2>{loans.length}</h2>
                </div>

                <div className="summary-card">
                    <h3>Total Debt</h3>
                    <h2>₹{totalDebt.toLocaleString()}</h2>
                </div>

                <div className="summary-card">
                    <h3>Total EMI</h3>
                    <h2>₹{totalEMI.toLocaleString()}</h2>
                </div>

                <div className="summary-card">
                    <h3>Average Interest</h3>
                    <h2>{avgInterest}%</h2>
                </div>

            </div>

            <div className="search-box">
                <FaSearch />
                <input
                    type="text"
                    placeholder="Search Loan..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {filteredLoans.map((loan) => (
                <div className="loan-card" key={loan._id}>

                    <div className="loan-top">

                        <div className="loan-title">

                            <div className="loan-icon">
                                {getIcon(loan.loanName)}
                            </div>

                            <div>
                                <h2>{loan.loanName}</h2>
                                <p>{loan.bankName}</p>
                            </div>

                        </div>

                        <span className="status active">
                            {loan.status}
                        </span>

                    </div>

                    <div className="loan-details">

                        <div>
                            <h4>Loan Amount</h4>
                            <p>₹{loan.amount.toLocaleString()}</p>
                        </div>

                        <div>
                            <h4>Monthly EMI</h4>
                            <p>₹{loan.monthlyEMI.toLocaleString()}</p>
                        </div>

                        <div>
                            <h4>Interest</h4>
                            <p>{loan.interestRate}%</p>
                        </div>

                        <div>
                            <h4>Duration</h4>
                            <p>{loan.duration} Months</p>
                        </div>

                    </div>

                    <div className="progress-section">

                        <div className="progress-text">
                            <span>Repayment Progress</span>
                            <span>35%</span>
                        </div>

                        <div className="progress">
                            <span style={{ width: "35%" }}></span>
                        </div>

                    </div>

                    <div className="loan-actions">

                        <button
                            className="view-btn"
                            onClick={() => setSelectedLoan(loan)}
                        >
                            <FaEye />
                            View
                        </button>

                        <button
                            className="edit-btn"
                            onClick={() => navigate(`/edit-loan/${loan._id}`)}
                        >
                            <FaEdit />
                            Edit
                        </button>

                        <button
                            className="delete-btn"
                            onClick={() => handleDelete(loan._id)}
                        >
                            <FaTrash />
                            Delete
                        </button>

                    </div>

                </div>
            ))}

            {filteredLoans.length === 0 && (
                <div
                    style={{
                        textAlign: "center",
                        marginTop: "40px",
                        color: "#64748b",
                    }}
                >
                    <h2>No Loans Found</h2>
                </div>
            )}

            <LoanModal
                loan={selectedLoan}
                onClose={() => setSelectedLoan(null)}
            />

        </div>
    );
}

export default MyLoans;