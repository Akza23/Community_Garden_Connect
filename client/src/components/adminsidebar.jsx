import { Link } from "react-router";
import "../style/admin.css";

function AdminSidebar({ setPage }) {
    function Logout() {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            localStorage.clear();
            window.location.href = "/";
        }
    }
    return (
        <aside className="admin-sidebar">
            <div className="menu-top">
                <ul>
                    <li>
                        <Link to="/adminviewgardeners">
                            <span>👩‍🌾</span> Gardeners
                        </Link>
                    </li>
                    <li>
                        <Link to="/adminviewmanagers">
                            <span>🧑‍💼</span> Garden Managers
                        </Link>
                    </li>
                    <li>
                        <Link to="/adminviewgardens">
                            <span>🪴</span> Garden Plots
                        </Link>
                    </li>
                    <li>
                        <Link to="/adminviewevents">
                            <span>🛠️</span> Events
                        </Link>
                    </li>
                    {/* <li onClick={() => setPage("complaints")}>
                        <span>⚠️</span> Complaints
                    </li>
                    <li onClick={() => setPage("reports")}>
                        <span>📄</span> Reports
                    </li> */}
                </ul>
            </div>
            <div className="menu-bottom">
                <button onClick={Logout} className="logout-btn"><Link>🚪 Logout</Link></button>
            </div>
        </aside>
    );
}

export default AdminSidebar;