import "./Hero.css";
import heroImage from "../assets/images/hero.png";

function Hero() {
    return (
        <section className="hero">
            <div className="hero-text">
                <h1>AI-Powered Debt Relief Platform</h1>

                <p>
                    Take control of your finances with intelligent debt analysis,
                    personalized repayment plans, and AI-powered financial guidance.
                </p>

                <div className="hero-buttons">
                    <button className="primary-btn">Get Started</button>
                    <button className="secondary-btn">Learn More</button>
                </div>
            </div>

            <div className="hero-image">
                <img src={heroImage} alt="Finance" />
            </div>
        </section>
    );
}

export default Hero;