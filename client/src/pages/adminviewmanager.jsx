import React, { useEffect, useState } from 'react'
import AdminNavbar from '../components/adminnavbar'
import "../style/admin.css"
import instance from '../utils/apiClient'

function AdminViewManager() {
    const [details, setDetails] = useState([])
    const [refresh, setRefresh] = useState(false)
    async function managerData() {
        const response = await instance.get("/admin/viewmanager")
        setDetails(response.data.manager)
    }
    useEffect(() => {
        managerData()
    }, [refresh])
    async function activate(managerid) {
        await instance.patch("/admin/activate", { managerid })
        setRefresh(!refresh)
        alert("Manager activated successfully")
    }
    async function deactivate(managerid) {
        await instance.patch("/admin/deactivate", { managerid })
        setRefresh(!refresh)
        alert("Manager deactivated successfully")
    }
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
                                {item.Activated === true ? (
                                    <span className="status-badge activated">
                                        ✔ Activated
                                    </span>
                                ) : (
                                    <button onClick={() => { activate(item._id) }} className='btn btn-outline-primary'>Activate</button>
                                )}
                            </td>
                            <td>
                                {item.Activated === false ? (
                                    <span className="status-badge deactivated">
                                        ✖ Deactivated
                                    </span>
                                ) : (
                                    <button onClick={() => { deactivate(item._id) }} className='btn btn-outline-secondary'>Deactivate</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default AdminViewManager