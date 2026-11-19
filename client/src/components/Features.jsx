import "./Features.css";

function Features() {
    const features = [
        {
            icon: "🤖",
            title: "AI Debt Analysis",
            description:
                "Get intelligent recommendations to reduce debt using advanced AI algorithms.",
        },
        {
            icon: "📊",
            title: "Financial Reports",
            description:
                "View beautiful dashboards and understand your spending habits with interactive reports.",
        },
        {
            icon: "💰",
            title: "Repayment Planner",
            description:
                "Create personalized debt repayment schedules and become debt-free faster.",
        },
    ];

    return (
        <section id="features" className="features-section">
            <h2 className="features-title">
                Why Choose Our Platform?
            </h2>

            <div className="features-container">
                {features.map((feature, index) => (
                    <div className="home-feature-card" key={index}>
                        <div className="feature-icon">
                            {feature.icon}
                        </div>

                        <h3>{feature.title}</h3>

                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Features;