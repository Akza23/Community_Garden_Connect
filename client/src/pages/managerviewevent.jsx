import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import ManagerNavbar from '../components/managernavbar'
import instance from '../utils/apiClient'

function ManagerViewEvent() {
    const [details, setDetails] = useState([])
    async function eventData() {
        const response = await instance.get("/event/view")
        setDetails(response.data.event)
    }
    useEffect(() => {
        eventData()
    }, [])
    return (
        <>
            <ManagerNavbar />
            <div className='manager-event'>
                <h1>New Events</h1>
                <div className='manager-event-container'>
                    {details.map((item) => (
                        <div className='manager-event-list'>
                            <img src={"http://localhost:8080/uploads/" + item.image} alt="Event Image" />
                            <p><strong>Event Name: </strong>{item.eventName}</p>
                            <p><strong>Event Category: </strong>{item.eventCategory}</p>
                            <p><strong>Description: </strong>{item.description}</p>
                            <p><strong>Location: </strong>{item.location}</p>
                            <p><strong>Date & Time: </strong>{item.eventDate}, {item.eventTime}</p>
                            <div className='edit-delete-button'>
                                <button className='btn btn-warning'><Link to={"/editevent/" + item._id}>EDIT</Link></button>
                                <button className='btn btn-danger'>DELETE</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ManagerViewEvent
