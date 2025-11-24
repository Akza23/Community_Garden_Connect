import { useState } from "react";
import "../style/admin.css";
import AdminDashboard from "./admindashboard";
import AdminNavbar from "./adminnavbar";
import AdminSidebar from "./adminsidebar";

function AdminHome() {
    const [page, setPage] = useState("dashboard");

    return (
        <div className="admin-wrapper">
            <AdminNavbar />

            <div className="admin-layout">
                <AdminSidebar setPage={setPage} />

                <main className="admin-main">
                    {page === "dashboard" && <AdminDashboard />}
                </main>
            </div>
        </div>
    );
}

export default AdminHome;