import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import ManagerNavbar from '../components/managernavbar'
import "../style/garden.css"
import instance from '../utils/apiClient'

function ManagerViewGarden() {
    const [details, setDetails] = useState([])
    const [count, setCount] = useState(0)
    async function gardenData() {
        const response = await instance.get("/garden/view")
        setDetails(response.data)
    }
    useEffect(() => {
        gardenData()
    }, [count])
    async function remove(id) {
        try {
            let response = await instance.delete("/garden/delete/" + id)
            alert("Deleted Successfully")
            setCount(count + 1)
        }
        catch {
            alert("Deleted Unsuccessfully")
        }
    }
    return (
        <>
            <ManagerNavbar />
            <div className='manager-garden-container'>
                <h1>Garden Plots</h1>
                <div className="manager-garden-list">
                    {details.map((item) => (
                        <div className='manager-garden-view'>
                            <img src={"http://localhost:8080/uploads/" + item.image} />
                            <strong>Garden Name:</strong>
                            <span>{item.plotName}</span>
                            <strong>Description:</strong>
                            <span>{item.description}</span>
                            <strong>Location:</strong>
                            <span>{item.location}</span>
                            <strong>Garden Type:</strong>
                            <span>{item.gardenType}</span>
                            <div className="card-buttons">
                                <button className='edit-btn'><Link to={"/editgarden/" + item._id}>EDIT</Link></button>
                                <button className='delete-btn' onClick={() => remove(item._id)}>DELETE</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ManagerViewGarden