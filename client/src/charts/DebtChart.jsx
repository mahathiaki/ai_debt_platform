import {
    Bar
} from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

function DebtChart({ loans = [] }) {

    const labels = loans.map((loan) => loan.loanName);

    const amounts = loans.map((loan) => loan.amount);

    const colors = [
        "#2563eb",
        "#16a34a",
        "#9333ea",
        "#ea580c",
        "#ec4899",
        "#0ea5e9",
        "#14b8a6",
        "#f59e0b",
    ];

    const data = {
        labels,

        datasets: [
            {
                label: "Loan Amount (₹)",

                data: amounts,

                backgroundColor: amounts.map(
                    (_, index) => colors[index % colors.length]
                ),

                borderRadius: 10,

                borderSkipped: false,

                maxBarThickness: 55,
            },
        ],
    };

    const options = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {

                display: false,

            },

            tooltip: {

                backgroundColor: "#0f172a",

                padding: 12,

                titleColor: "#fff",

                bodyColor: "#fff",

                callbacks: {

                    label: function (context) {

                        return ` ₹${context.raw.toLocaleString()}`;

                    },

                },

            },

        },

        scales: {

            x: {

                grid: {

                    display: false,

                },

                ticks: {

                    color: "#475569",

                    font: {

                        size: 13,

                        weight: "600",

                    },

                },

            },

            y: {

                beginAtZero: true,

                ticks: {

                    color: "#475569",

                    callback: function (value) {

                        return "₹" + value.toLocaleString();

                    },

                },

                grid: {

                    color: "#e2e8f0",

                },

            },

        },

        animation: {

            duration: 1800,

        },

    };

    if (loans.length === 0) {

        return (

            <div
                style={{
                    height: "320px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#64748b",
                    fontSize: "18px",
                }}
            >
                No loan data available
            </div>

        );

    }

    return (

        <div
            style={{
                height: "340px",
            }}
        >
            <Bar
                data={data}
                options={options}
            />
        </div>

    );

}

export default DebtChart;