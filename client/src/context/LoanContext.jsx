import { createContext, useState } from "react";

export const LoanContext = createContext();

function LoanProvider({ children }) {

    const [loans, setLoans] = useState([
        {
            id: 1,
            loanName: "Personal Loan",
            bank: "SBI",
            amount: 250000,
            interest: 12,
            emi: 8500,
            duration: 36,
            startDate: "2026-01-10",
            dueDate: "2028-12-10",
        },
        {
            id: 2,
            loanName: "Car Loan",
            bank: "HDFC",
            amount: 90000,
            interest: 9,
            emi: 6200,
            duration: 24,
            startDate: "2026-02-15",
            dueDate: "2028-02-15",
        },
    ]);

    // Add a new loan
    const addLoan = (loan) => {
        setLoans((prevLoans) => [
            ...prevLoans,
            {
                id: Date.now(),
                ...loan,
            },
        ]);
    };

    // Delete a loan
    const deleteLoan = (id) => {
        setLoans(loans.filter((loan) => loan.id !== id));
    };

    // Update a loan
    const updateLoan = (updatedLoan) => {
        setLoans(
            loans.map((loan) =>
                loan.id === updatedLoan.id ? updatedLoan : loan
            )
        );
    };

    return (
        <LoanContext.Provider
            value={{
                loans,
                addLoan,
                deleteLoan,
                updateLoan,
            }}
        >
            {children}
        </LoanContext.Provider>
    );
}

export default LoanProvider;