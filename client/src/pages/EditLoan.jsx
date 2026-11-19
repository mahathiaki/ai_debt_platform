import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import API from "../services/api";
import "./EditLoan.css";

function EditLoan() {
    const { id } = useParams();
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
        status: "Active",
    });

    useEffect(() => {
        fetchLoan();
    }, []);

    const fetchLoan = async () => {
        try {
            const res = await API.get("/loans");

            const selectedLoan = res.data.loans.find(
                (loan) => loan._id === id
            );

            if (selectedLoan) {
                setLoan({
                    ...selectedLoan,
                    startDate: selectedLoan.startDate
                        ? selectedLoan.startDate.substring(0, 10)
                        : "",
                    dueDate: selectedLoan.dueDate
                        ? selectedLoan.dueDate.substring(0, 10)
                        : "",
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        setLoan({
            ...loan,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await API.put(`/loans/${id}`, loan);

            if (res.data.success) {
                toast.success("Loan Updated Successfully");
                navigate("/myloans");
            }
        } catch (err) {
            console.log(err);
            toast.error("Unable to update loan");
        }
    };

    return (
        <Layout>
            <div className="edit-loan-page">

                <div className="edit-loan-card">

                    <h2>✏️ Edit Loan</h2>

                    <p>
                        Update your loan details and keep your repayment information accurate.
                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className="form-grid">

                            <div className="form-group">
                                <label>Loan Name</label>
                                <input
                                    type="text"
                                    name="loanName"
                                    value={loan.loanName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Bank Name</label>
                                <input
                                    type="text"
                                    name="bankName"
                                    value={loan.bankName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Loan Amount</label>
                                <input
                                    type="number"
                                    name="amount"
                                    value={loan.amount}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Interest Rate (%)</label>
                                <input
                                    type="number"
                                    name="interestRate"
                                    value={loan.interestRate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Monthly EMI</label>
                                <input
                                    type="number"
                                    name="monthlyEMI"
                                    value={loan.monthlyEMI}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Duration (Months)</label>
                                <input
                                    type="number"
                                    name="duration"
                                    value={loan.duration}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Start Date</label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={loan.startDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Due Date</label>
                                <input
                                    type="date"
                                    name="dueDate"
                                    value={loan.dueDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group full-width">
                                <label>Status</label>
                                <select
                                    name="status"
                                    value={loan.status}
                                    onChange={handleChange}
                                >
                                    <option value="Active">Active</option>
                                    <option value="Closed">Closed</option>
                                </select>
                            </div>

                        </div>

                        <button type="submit" className="update-btn">
                            Update Loan
                        </button>

                    </form>

                </div>

            </div>
        </Layout>
    );
}

export default EditLoan;