import "../style/admin.css";
import { Link } from "react-router";

function AdminNavbar() {
    return (
        <header className="admin-navbar">
            <h2 className="brand">Community Garden Connect</h2>
            <div className="admin-profile">
                <img
                    src="https://c.superprof.com/i/a/27953265/13296140/600/20230913150140/graduate-bachelors-business-administration-with-now-masters-student-finance-from-university-melbourne-have.jpg"
                    alt="Admin"
                />
                <span><Link to="/adminhome">Admin</Link></span>
            </div>
        </header>
    );
}

export default AdminNavbar;