import React, { useEffect, useState } from "react";
import "../style/manager.css";
import instance from "../utils/apiClient";
import Footer from "./footer";
import ManagerNavbar from "./managernavbar";

function ManagerHome() {

    const [manager, setManager] = useState(null);

    async function getManager() {
        try {
            const response = await instance.get("/manager/profile");
            setManager(response.data.manager)
        }
        catch (e) {
            console.log("Error fetching manager:", e)
        }
    }
    useEffect(() => {
        getManager()
    }, [])

    return (
        <>
            <ManagerNavbar />
            <div className="manager-home">
                {/* HERO SECTION */}
                <section id="manager-hero">
                    <img src="/images/manager-main.jpg" className="manager-hero-img" alt="manager" />
                    <div className="manager-hero-text">
                        <h1>Hello {manager?.fullName ? manager.fullName : "Manager"} 🌿</h1>
                        <p>
                            Welcome to your dashboard. Here you can manage gardens, monitor gardeners,
                            check community requests and keep everything running smoothly.
                        </p>
                        <button className="manager-btn">Explore Dashboard</button>
                    </div>
                </section>
                {/* OPTIONS BELOW */}
                <div className="manager-options">
                    <div className="manager-box">
                        <img src="/images/garden.png" alt="garden" />
                        <h3>View Gardens</h3>
                    </div>
                    <div className="manager-box">
                        <img src="/images/gardener.png" alt="gardener" />
                        <h3>Manage Gardeners</h3>
                    </div>
                    <div className="manager-box">
                        <img src="/images/report.png" alt="report" />
                        <h3>Reports</h3>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ManagerHome;
