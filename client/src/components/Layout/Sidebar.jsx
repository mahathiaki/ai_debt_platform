import { Link, useLocation } from "react-router-dom";
import {
    FaHome,
    FaChartPie,
    FaMoneyCheckAlt,
    FaPlusCircle,
    FaRobot,
    FaCog,
} from "react-icons/fa";

function Sidebar() {
    const location = useLocation();

    const menuItems = [
        { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
        { name: "My Loans", icon: <FaMoneyCheckAlt />, path: "/myloans" },
        { name: "Add Loan", icon: <FaPlusCircle />, path: "/addloan" },
        { name: "Analytics", icon: <FaChartPie />, path: "/analytics" },
        { name: "AI Insights", icon: <FaRobot />, path: "/dashboard" },
        { name: "Settings", icon: <FaCog />, path: "/settings" },
    ];

    return (
        <div className="sidebar">

            <div className="logo">

                <h2>💰 DebtRelief AI</h2>

            </div>

            <ul>

                {menuItems.map((item) => (

                    <li
                        key={item.name}
                        className={
                            location.pathname === item.path ? "active-menu" : ""
                        }
                    >

                        <Link to={item.path}>

                            <span>{item.icon}</span>

                            {item.name}

                        </Link>

                    </li>

                ))}

            </ul>

        </div>
    );
}

export default Sidebar;