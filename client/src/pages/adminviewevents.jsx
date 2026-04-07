import React, { useEffect, useState } from 'react'
import AdminNavbar from '../components/adminnavbar'
import instance from '../utils/apiClient'

function AdminViewEvents() {
    const [details, setDetails] = useState([])
    async function eventData() {
        const response = await instance.get("/admin/viewevents")
        setDetails(response.data.event)
    }
    useEffect(() => {
        eventData()
    }, [])
    return (
        <>
            <AdminNavbar />
            <div className='admin-event-container'>
                <h1>Events</h1>
                <div className='admin-event-list'>
                    {details.map((item) => (
                        <div className='admin-event-view'>
                            <img src={"http://localhost:8080/uploads/" + item.image} alt="event image" />
                            <p><strong>Event Name: </strong>{item.eventName}</p>
                            <p><strong>Event Category: </strong>{item.eventCategory}</p>
                            <p><strong>Description: </strong>{item.description}</p>
                            <p><strong>Location: </strong>{item.location}</p>
                            <p><strong>Date & Time: </strong>{item.eventDate}, {item.eventTime}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default AdminViewEvents
