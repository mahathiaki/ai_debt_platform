import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../services/authService";
import "./Login.css";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            setLoading(true);

            const userData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
            };

            const data = await registerUser(userData);

            if (data.success) {
                toast.success(data.message);

                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            console.log(err);

            toast.error(
                err.response?.data?.message || "Registration Failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">

            {/* Left Panel */}

            <div className="left-panel">

                <h1>
                    Join <span>DebtRelief AI</span>
                </h1>

                <p>
                    Create your account and begin your journey toward financial
                    freedom with AI-powered debt analysis and personalized
                    repayment plans.
                </p>

                <div className="feature">
                    <div className="icon">🤖</div>
                    <div>
                        <h3>AI Debt Analysis</h3>
                        <p>Understand your debt and receive smart recommendations.</p>
                    </div>
                </div>

                <div className="feature">
                    <div className="icon">📊</div>
                    <div>
                        <h3>Financial Insights</h3>
                        <p>Track expenses and monitor financial growth.</p>
                    </div>
                </div>

                <div className="feature">
                    <div className="icon">💰</div>
                    <div>
                        <h3>Personalized Plans</h3>
                        <p>Create repayment schedules that fit your budget.</p>
                    </div>
                </div>

            </div>

            {/* Right Panel */}

            <div className="right-panel">

                <div className="login-card">

                    <h2>Create Account</h2>

                    <p className="subtitle">
                        Sign up to begin managing your debt smarter.
                    </p>

                    <form onSubmit={handleSubmit}>

                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />

                        <div className="remember">
                            <label>
                                <input
                                    type="checkbox"
                                    required
                                    style={{
                                        width: "15px",
                                        marginRight: "8px",
                                    }}
                                />
                                I agree to the Terms & Conditions
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="login-btn"
                            disabled={loading}
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>

                    </form>

                    <p className="register-text">
                        Already have an account?{" "}
                        <Link to="/login">Login</Link>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Register;