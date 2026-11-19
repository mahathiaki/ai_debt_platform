import "./LoanModal.css";

function LoanModal({ loan, onClose }) {
    if (!loan) return null;

    return (
        <div className="modal-overlay">

            <div className="modal-card">

                <button
                    className="close-btn"
                    onClick={onClose}
                >
                    ✖
                </button>

                <h2>🏦 Loan Details</h2>

                <div className="modal-grid">

                    <div>
                        <strong>Loan Name</strong>
                        <p>{loan.loanName}</p>
                    </div>

                    <div>
                        <strong>Bank Name</strong>
                        <p>{loan.bankName}</p>
                    </div>

                    <div>
                        <strong>Loan Amount</strong>
                        <p>₹{loan.amount.toLocaleString()}</p>
                    </div>

                    <div>
                        <strong>Interest Rate</strong>
                        <p>{loan.interestRate}%</p>
                    </div>

                    <div>
                        <strong>Monthly EMI</strong>
                        <p>₹{loan.monthlyEMI.toLocaleString()}</p>
                    </div>

                    <div>
                        <strong>Duration</strong>
                        <p>{loan.duration} Months</p>
                    </div>

                    <div>
                        <strong>Start Date</strong>
                        <p>
                            {new Date(loan.startDate).toLocaleDateString()}
                        </p>
                    </div>

                    <div>
                        <strong>Due Date</strong>
                        <p>
                            {new Date(loan.dueDate).toLocaleDateString()}
                        </p>
                    </div>

                    <div>
                        <strong>Status</strong>
                        <p>{loan.status}</p>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default LoanModal;