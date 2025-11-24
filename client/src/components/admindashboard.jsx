import "../style/admin.css";

function AdminDashboard() {
    return (
        <div className="simple-dashboard">

            <h2 className="page-title">Dashboard</h2>

            {/* Top Cards */}
            <div className="simple-card-grid">
                <div className="simple-card">
                    <h4>Total Gardeners</h4>
                    <p className="card-number">124</p>
                </div>

                <div className="simple-card">
                    <h4>Total Managers</h4>
                    <p className="card-number">32</p>
                </div>

                <div className="simple-card">
                    <h4>Total Gardens</h4>
                    <p className="card-number">18</p>
                </div>

                <div className="simple-card">
                    <h4>Complaints</h4>
                    <p className="card-number">07</p>
                </div>
            </div>

            {/* Recent Section */}
            <div className="simple-section">
                <h3 className="section-title">Recent Activity</h3>

                <ul className="activity-list">
                    <li>New gardener registered</li>
                    <li>Complaint #102 updated</li>
                    <li>Garden “North Park” approved</li>
                    <li>Manager login recorded</li>
                </ul>
            </div>

        </div>
    );
}

export default AdminDashboard;