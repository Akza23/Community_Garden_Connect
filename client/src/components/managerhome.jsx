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
                    <img src="https://gardening.org/wp-content/uploads/2023/11/how-to-start-a-community-garden-in-8-steps-featured.jpg" className="manager-hero-img" alt="manager" />
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
                        <img src="https://seedmoney.org/wp-content/uploads/2022/10/community-garden-1024x510.jpg" alt="garden" />
                        <h3>View Gardens</h3>
                    </div>
                    <div className="manager-box">
                        <img src="https://foodtank.com/wp-content/uploads/2024/06/Denver-Urban-Gardens-Urban-Garden-Project-food-forests-community-gardens.jpg" alt="gardener" />
                        <h3>Manage Gardeners</h3>
                    </div>
                    <div className="manager-box">
                        <img src="https://content.ces.ncsu.edu/media/images/IMG_9404_Lucy_Bradley.JPG" alt="report" />
                        <h3>Reports</h3>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ManagerHome;
