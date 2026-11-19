import "./UpcomingEMI.css";

import {
    FaCalendarAlt,
    FaClock,
    FaCheckCircle,
    FaExclamationCircle,
} from "react-icons/fa";

function UpcomingEMI({ loans = [] }) {

    if (loans.length === 0) {
        return (
            <div className="emi-card">

                <div className="emi-header">

                    <FaCalendarAlt className="emi-main-icon" />

                    <div>

                        <h2>Upcoming EMI</h2>

                        <p>No active loans available.</p>

                    </div>

                </div>

            </div>
        );
    }

    const today = new Date();

    const sortedLoans = [...loans].sort(
        (a, b) =>
            new Date(a.dueDate) - new Date(b.dueDate)
    );

    return (

        <div className="emi-card">

            <div className="emi-header">

                <FaCalendarAlt className="emi-main-icon" />

                <div>

                    <h2>Upcoming EMI Schedule</h2>

                    <p>Your next repayment reminders.</p>

                </div>

            </div>

            <div className="emi-list">

                {sortedLoans.map((loan) => {

                    const due = new Date(loan.dueDate);

                    const diff = Math.ceil(
                        (due - today) / (1000 * 60 * 60 * 24)
                    );

                    return (

                        <div
                            className="emi-item"
                            key={loan._id}
                        >

                            <div className="emi-left">

                                <h3>{loan.loanName}</h3>

                                <span>{loan.bankName}</span>

                            </div>

                            <div className="emi-center">

                                <strong>
                                    ₹{loan.monthlyEMI.toLocaleString()}
                                </strong>

                            </div>

                            <div className="emi-right">

                                {diff >= 0 ? (

                                    <>

                                        <FaClock className="clock" />

                                        <span>

                                            {diff} day
                                            {diff !== 1 ? "s" : ""}

                                        </span>

                                    </>

                                ) : (

                                    <>

                                        <FaExclamationCircle className="late" />

                                        <span className="late-text">

                                            Overdue

                                        </span>

                                    </>

                                )}

                            </div>

                            <div className="emi-status">

                                {diff > 5 ? (

                                    <span className="status upcoming">

                                        Upcoming

                                    </span>

                                ) : diff >= 0 ? (

                                    <span className="status due">

                                        Due Soon

                                    </span>

                                ) : (

                                    <span className="status overdue">

                                        Overdue

                                    </span>

                                )}

                            </div>

                        </div>

                    );

                })}

            </div>

            <div className="emi-footer">

                <FaCheckCircle />

                <span>

                    Keep paying your EMI on time to improve your credit score.

                </span>

            </div>

        </div>

    );

}

export default UpcomingEMI;