import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import ManagerNavbar from '../components/managernavbar'
import instance from '../utils/apiClient'

function ManagerProfile() {
    const [details, setDetails] = useState()
    async function managerData() {
        const response = await instance.get("/manager/profile")
        setDetails(response.data.manager)
    }
    useEffect(() => {
        managerData()
    }, [])
    return (
        <>
            <ManagerNavbar />
            <div className='manager-profile-container'>
                <div className='manager-profile-card'>
                    <div className="manager-profile-header">
                        <img src={"http://localhost:8080/uploads/" + details?.profilePic}
                            alt="Manager Profile"
                            className="manager-profile-image" />
                        <h1 className="manager-profile-name">{details?.fullName || "Loading..."}</h1>
                        <p className="manager-profile-role">🌱 Garden Manager</p>
                    </div>
                    <div className="manager-profile-details">
                        <div className="manager-detail-item">
                            <strong>🏡 Address:</strong> {details?.address}
                        </div>
                        <div className="manager-detail-item">
                            <strong>🏙 City:</strong> {details?.city}
                        </div>
                        <div className="manager-detail-item">
                            <strong>🗺️ District:</strong> {details?.district}
                        </div>
                        <div className="manager-detail-item">
                            <strong>📍 Pincode:</strong> {details?.pincode}
                        </div>
                        <div className="manager-detail-item">
                            <strong>🚻 Gender:</strong> {details?.gender}
                        </div>
                        <div className="manager-detail-item">
                            <strong>✉ Email:</strong> {details?.email}
                        </div>
                        <div className="manager-detail-item">
                            <strong>📞 Contact:</strong> {details?.contact}
                        </div>
                    </div>
                    <button className="manager-update-btn"><Link to="/managerprofileedit">Update</Link></button>
                </div>
            </div>
        </>
    )
}

export default ManagerProfile