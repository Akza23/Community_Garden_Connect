import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import GardenerNavbar from "../components/gardenernavbar"
import instance from '../utils/apiClient'

function GardenerViewGarden() {
    const [details, setDetails] = useState([])
    async function gardenData() {
        const response = await instance.get("/gardener/viewgarden")
        setDetails(response.data.garden)
    }
    useEffect(() => {
        gardenData()
    }, [])
    return (
        <>
            <GardenerNavbar />
            <div className='garden-gardener'>
                <h1>Garden Plots</h1>
                <div className='garden-gardener-container'>
                    {details.map((item) => (
                        <div className='garden-gardener-list'>
                            <img src={"http://localhost:8080/uploads/" + item.image} alt="garden image" />
                            <p><strong>Garden Name: </strong>{item.plotName}</p>
                            <p><strong>Description: </strong>{item.description}</p>
                            <p><strong>Location: </strong>{item.location}</p>
                            <p><strong>Garden Type: </strong>{item.gardenType}</p>
                        </div>
                    ))}
                </div>
                <button><Link to="/gardenerchat" className='garden-chat-btn'>💬 Chat</Link></button>
            </div>
        </>
    )
}

export default GardenerViewGarden
