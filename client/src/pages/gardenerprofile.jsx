import { useEffect, useState } from "react"
import { Link } from "react-router"
import GardenerNavbar from "../components/gardenernavbar"
import "../style/gardener.css"
import instance from "../utils/apiClient"

function GardenerProfile() {
    const [details, setDetails] = useState()
    async function gardenerData() {
        const response = await instance.get("/gardener/profile")
        setDetails(response.data.gardener)
    }
    useEffect(() => {
        gardenerData()
    }, [])
    return (
        <>
            <GardenerNavbar />
            <div className="gardener-profile-container">
                <div className="profile-card">
                    <div className="profile-header">
                        <img src={"http://localhost:8080/uploads/" + details?.profilePic}
                            alt="Gardener Profile"
                            className="profile-image" />
                        <h1 className="profile-name">{details?.fullName || "Loading..."}</h1>
                        <p className="profile-role">🌱 Gardener</p>
                    </div>
                    <div className="profile-details">
                        <div className="detail-item">
                            <strong>🏡 Address:</strong> {details?.address}
                        </div>
                        <div className="detail-item">
                            <strong>🏙 City:</strong> {details?.city}
                        </div>
                        <div className="detail-item">
                            <strong>📍 District:</strong> {details?.district}
                        </div>
                        <div className="detail-item">
                            <strong>🎂 Date of Birth:</strong> {details?.dob}
                        </div>
                        <div className="detail-item">
                            <strong>🚻 Gender:</strong> {details?.gender}
                        </div>
                        <div className="detail-item">
                            <strong>🛠 Skills:</strong> {details?.skills}
                        </div>
                        <div className="detail-item">
                            <strong>✉ Email:</strong> {details?.email}
                        </div>
                        <div className="detail-item">
                            <strong>📞 Contact:</strong> {details?.mobileNo}
                        </div>
                    </div>
                    <button className="update-btn"><Link to="/gardenerprofileedit">Update</Link></button>
                </div>
            </div>
        </>
    )
}

export default GardenerProfile
