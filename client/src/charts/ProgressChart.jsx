import {
    Doughnut
} from "react-chartjs-2";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function ProgressChart({ loans = [] }) {

    const totalLoan = loans.reduce(
        (sum, loan) => sum + Number(loan.amount),
        0
    );

    // Demo calculation: assume 30% of every loan is repaid
    const totalPaid = totalLoan * 0.30;

    const remaining = totalLoan - totalPaid;

    const progress =
        totalLoan > 0
            ? Math.round((totalPaid / totalLoan) * 100)
            : 0;

    const data = {

        labels: [
            "Paid",
            "Remaining",
        ],

        datasets: [
            {
                data: [
                    totalPaid,
                    remaining,
                ],

                backgroundColor: [
                    "#22c55e",
                    "#2563eb",
                ],

                borderWidth: 0,

                hoverOffset: 8,

                cutout: "72%",
            },
        ],
    };

    const options = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {

                position: "bottom",

                labels: {

                    padding: 20,

                    usePointStyle: true,

                    pointStyle: "circle",

                    font: {

                        size: 14,

                        weight: "600",

                    },

                },

            },

            tooltip: {

                callbacks: {

                    label: function (context) {

                        return (
                            context.label +
                            ": ₹" +
                            context.raw.toLocaleString()
                        );

                    },

                },

            },

        },

        animation: {

            animateRotate: true,

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
                position: "relative",
                height: "340px",
            }}
        >

            <Doughnut
                data={data}
                options={options}
            />

            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    textAlign: "center",
                    pointerEvents: "none",
                }}
            >

                <h2
                    style={{
                        color: "#2563eb",
                        margin: 0,
                        fontSize: "34px",
                    }}
                >
                    {progress}%
                </h2>

                <p
                    style={{
                        margin: 0,
                        color: "#64748b",
                    }}
                >
                    Repaid
                </p>

            </div>

        </div>

    );

}

export default ProgressChart;