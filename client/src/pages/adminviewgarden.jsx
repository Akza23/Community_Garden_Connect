import React, { useEffect, useState } from 'react'
import AdminNavbar from '../components/adminnavbar'
import instance from '../utils/apiClient'

function AdminViewGarden() {
    const [details, setDetails] = useState([])
    async function gardenData() {
        const response = await instance.get("/admin/viewgardens")
        setDetails(response.data.garden)
    }
    useEffect(() => {
        gardenData()
    }, [])
    return (
        <>
            <AdminNavbar />
            <div className='admin-garden-container'>
                <h1>Garden Plots</h1>
                <div className='admin-garden-list'>
                    {details.map((item) => (
                        <div className='admin-garden-view'>
                            <img src={"http://localhost:8080/uploads/" + item.image} alt="garden image" />
                            <strong>Garden Name: </strong>
                            <span>{item.plotName}</span>
                            <strong>Description: </strong>
                            <span>{item.description}</span>
                            <strong>Location: </strong>
                            <span>{item.location}</span>
                            <strong>Garden Type: </strong>
                            <span>{item.gardenType}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default AdminViewGarden
