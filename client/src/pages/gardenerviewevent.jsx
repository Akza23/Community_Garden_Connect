import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import GardenerNavbar from "../components/gardenernavbar"
import "../style/gardener.css"
import instance from '../utils/apiClient'

function GardenerViewEvent() {
    const [details, setDetails] = useState([])
    const [refresh, setRefresh] = useState(true)
    async function eventData() {
        const response = await instance.get("/gardener/viewevent")
        setDetails(response.data.event)
    }
    useEffect(() => {
        eventData()
    }, [refresh])

    async function register(eventId) {
        const res = await instance.post("/gardener/registerevent", { eventId })
        toast.success("Successfully registered for event")
        setRefresh(!refresh)
    }
    return (
        <>
            <GardenerNavbar />
            <div className='gardener-event'>
                <h1>New Events</h1>
                <div className='gardener-event-container'>
                    {details.map((item) => {
                        return (
                            <div className='gardener-event-list'>
                                <img src={"http://localhost:8080/uploads/" + item.image} alt="Event image" />
                                <p><strong>Event Name: </strong>{item.eventName}</p>
                                <p><strong>Event Category: </strong>{item.eventCategory}</p>
                                <p><strong>Description: </strong>{item.description}</p>
                                <p><strong>Location: </strong>{item.location}</p>
                                <p><strong>Date & Time: </strong>{item.eventDate}, {item.eventTime}</p>
                                <button className='btn btn-outline-primary' onClick={() => register(item._id)} disabled={item.registered}>REGISTER</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default GardenerViewEvent
