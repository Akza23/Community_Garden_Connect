import React, { useEffect, useState } from 'react'
import AdminNavbar from '../components/adminnavbar'
import instance from '../utils/apiClient'
import "../style/admin.css"

function AdminViewManager() {
    const [details, setDetails] = useState([])
    async function managerData() {
        const response = await instance.get("/admin/viewmanager")
        setDetails(response.data.manager)
    }
    useEffect(() => {
        managerData()
    }, [])
    return (
        <>
            <AdminNavbar />
            <table className='manager-table'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Full Name</th>
                        <th>Address</th>
                        <th>Contact Number</th>
                        <th>Gender</th>
                        <th>District</th>
                        <th>City</th>
                        <th>Pincode</th>
                        <th>Email</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {details.map((item) => (
                        <tr>
                            <td>
                                <img src={"http://localhost:8080/uploads/" + item.profilePic} alt="manager image" />
                            </td>
                            <td>{item.fullName}</td>
                            <td>{item.address}</td>
                            <td>{item.contact}</td>
                            <td>{item.gender}</td>
                            <td>{item.district}</td>
                            <td>{item.city}</td>
                            <td>{item.pincode}</td>
                            <td>{item.email}</td>
                            <td>
                                <button className='btn btn-outline-info'>Activate</button>
                            </td>
                            <td>
                                <button className='btn btn-outline-warning'>Deactivate</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default AdminViewManager