import API from "./api";

// Get token from localStorage
const getConfig = () => {
    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

// Get All Loans
export const getLoans = async () => {
    const res = await API.get("/loans", getConfig());
    return res.data;
};

// Get Single Loan
export const getLoanById = async (id) => {
    const res = await API.get(`/loans/${id}`, getConfig());
    return res.data;
};

// Add Loan
export const addLoan = async (loanData) => {
    const res = await API.post("/loans", loanData, getConfig());
    return res.data;
};

// Update Loan
export const updateLoan = async (id, loanData) => {
    const res = await API.put(`/loans/${id}`, loanData, getConfig());
    return res.data;
};

// Delete Loan
export const deleteLoan = async (id) => {
    const res = await API.delete(`/loans/${id}`, getConfig());
    return res.data;
};