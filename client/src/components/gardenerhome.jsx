import { useEffect, useState } from 'react';
import instance from '../utils/apiClient';
import Footer from './footer';
import GardenerNavbar from './gardenernavbar';

function GardenerHome() {
    const [gardener, setGardener] = useState(null);

    async function getGardener() {
        try {
            const response = await instance.get("/gardener/profile");
            setGardener(response.data.gardener);
        } catch (error) {
            console.log("Error fetching gardener:", error);
        }
    }
    useEffect(() => {
        getGardener();
    }, []);
    return (
        <>
            <div>
                <GardenerNavbar />
                <div className="gardener-home-container">
                    {/* LEFT SECTION */}
                    <div className="gardener-home-left">
                        <h1 className="title">
                            Welcome {gardener?.fullName ? gardener.fullName : "Gardener"} 🌿
                        </h1>
                        <p className="subtitle">
                            Manage your garden, track activities, and connect with your garden community.
                        </p>
                        <button className="start-btn">Go to Dashboard</button>
                    </div>
                    {/* RIGHT IMAGE */}
                    <div className="gardener-home-right">
                        <img
                            src="https://images.stockcake.com/public/9/5/3/9535aafe-6182-4f92-87ae-805b92e0b955_large/community-garden-planting-stockcake.jpg"
                            alt="gardener"
                            className="gardener-img"
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default GardenerHome
