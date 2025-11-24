import React, { useEffect, useState } from 'react'
import AdminNavbar from '../components/adminnavbar'
import instance from '../utils/apiClient'

function AdminViewGardener() {
    const [details, setDetails] = useState([])
    async function gardenerData() {
        const response = await instance.get("/admin/viewgardener")
        setDetails(response.data.gardener)
    }
    useEffect(() => {
        gardenerData()
    }, [])
    return (
        <>
            <AdminNavbar />
            <div className="admin-gardener-list">
                {details.map((item) => (
                    <div className="gardener-row">
                        <img
                            src={"http://localhost:8080/uploads/" + item.profilePic}
                            alt="gardener image"
                        />
                        <div className="gardener-info">
                            <p><strong>Name:</strong> {item.fullName}</p>
                            <p><strong>Address:</strong> {item.address}</p>
                            <p><strong>DOB:</strong> {item.dob}</p>
                            <p><strong>Gender:</strong> {item.gender}</p>
                            <p><strong>Phone:</strong> {item.mobileNo}</p>
                            <p><strong>District:</strong> {item.district}</p>
                            <p><strong>City:</strong> {item.city}</p>
                            <p><strong>Skills:</strong> {item.skills}</p>
                            <p><strong>Email:</strong> {item.email}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default AdminViewGardener