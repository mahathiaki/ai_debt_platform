import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import "./Profile.css";

function Profile() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <Layout>
            <div className="profile-page">

                <div className="profile-card">

                    <div className="profile-avatar">
                        👤
                    </div>

                    <h2>{user?.name}</h2>

                    <p>{user?.email}</p>

                    <div className="profile-info">

                        <div>
                            <strong>Phone</strong>
                            <p>{user?.phone}</p>
                        </div>

                        <div>
                            <strong>Email</strong>
                            <p>{user?.email}</p>
                        </div>

                    </div>

                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </div>
        </Layout>
    );
}

export default Profile;