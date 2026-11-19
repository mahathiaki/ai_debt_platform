import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <h2 className="logo">DebtRelief AI</h2>

            <ul className="nav-links">
                <li>
                    <Link to="/">Home</Link>
                </li>

                <li>
                    <a href="#features">Features</a>
                </li>

                <li>
                    <a href="#about">About</a>
                </li>

                <li>
                    <a href="#contact">Contact</a>
                </li>
            </ul>

            <div className="nav-buttons">
                <Link to="/login">
                    <button className="login-btn">Login</button>
                </Link>

                <Link to="/register">
                    <button className="register-btn">Register</button>
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;