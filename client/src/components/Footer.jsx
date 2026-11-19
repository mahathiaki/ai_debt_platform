import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">

            <div className="footer-container">

                <div className="footer-about">
                    <h2>DebtRelief AI</h2>
                    <p>
                        AI-powered debt management platform helping users
                        achieve financial freedom through intelligent planning.
                    </p>
                </div>

                <div className="footer-links">
                    <h3>Quick Links</h3>

                    <ul>
                        <li>Home</li>
                        <li>Features</li>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h3>Contact</h3>

                    <p>📧 support@debtreliefai.com</p>
                    <p>📞 +91 9876543210</p>
                    <p>📍 Bhimavaram, Andhra Pradesh</p>
                </div>

            </div>

            <hr />

            <p className="copyright">
                © 2026 DebtRelief AI. All Rights Reserved.
            </p>

        </footer>
    );
}

export default Footer;