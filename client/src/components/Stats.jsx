import "./Stats.css";

function Stats() {
    return (
        <section className="stats">

            <h2>Our Impact</h2>

            <div className="stats-container">

                <div className="stat-card">
                    <h1>10K+</h1>
                    <p>Happy Users</p>
                </div>

                <div className="stat-card">
                    <h1>₹50M+</h1>
                    <p>Debt Managed</p>
                </div>

                <div className="stat-card">
                    <h1>98%</h1>
                    <p>Success Rate</p>
                </div>

                <div className="stat-card">
                    <h1>24/7</h1>
                    <p>AI Support</p>
                </div>

            </div>

        </section>
    );
}

export default Stats;