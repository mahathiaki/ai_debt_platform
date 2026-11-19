import Sidebar from "./Sidebar";
import "./Layout.css";

function Layout({ children }) {
    return (
        <div className="layout">

            <Sidebar />

            <div className="content">

                <div className="topbar">

                    <h2>AI Debt Relief Platform</h2>

                    <div className="profile">

                        👤 Bhuvana

                    </div>

                </div>

                <div className="page-content">

                    {children}

                </div>

            </div>

        </div>
    );
}

export default Layout;