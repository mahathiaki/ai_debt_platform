import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import "./Login.css";
import { toast } from "react-toastify";
function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
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

        try {
            setLoading(true);

            const data = await loginUser(formData);

            if (data.success) {
                // Save JWT token
                localStorage.setItem("token", data.token);

                // Save user info
                localStorage.setItem("user", JSON.stringify(data.user));

                toast.success("Login Successful!");

                navigate("/dashboard");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Login Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="left-panel">
                <h1>
                    Smarter Decisions,
                    <br />
                    <span>Debt-Free Tomorrow</span>
                </h1>

                <p>
                    AI-powered insights and personalized repayment plans to help you
                    manage debt smarter and become financially free.
                </p>

                <div className="feature">
                    <div className="icon">🔒</div>
                    <div>
                        <h3>Secure & Private</h3>
                        <p>Your financial information is protected.</p>
                    </div>
                </div>

                <div className="feature">
                    <div className="icon">📈</div>
                    <div>
                        <h3>AI Financial Analysis</h3>
                        <p>Smart recommendations based on your debt.</p>
                    </div>
                </div>

                <div className="feature">
                    <div className="icon">💳</div>
                    <div>
                        <h3>Easy Repayment Plans</h3>
                        <p>Become debt-free faster with AI guidance.</p>
                    </div>
                </div>
            </div>

            <div className="right-panel">
                <div className="login-card">
                    <h2>Welcome Back 👋</h2>

                    <p className="subtitle">
                        Login to continue your journey
                    </p>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <button
                            type="submit"
                            className="login-btn"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <div className="register-text">
                        Don't have an account?{" "}
                        <Link to="/register">Register</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;