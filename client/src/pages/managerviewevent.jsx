import React, { useEffect, useState } from 'react'
import ManagerNavbar from '../components/managernavbar'
import instance from '../utils/apiClient'

function ManagerViewEvent() {
    const [details, setDetails] = useState([])
    const [count, setCount] = useState(0)
    const [regcount, setRegcount] = useState()
    async function eventData() {
        const response = await instance.get("/event/view")
        setDetails(response.data.event)
    }
    useEffect(() => {
        eventData()
    }, [count])

    // async function registerCount() {
    //     const res = await instance.get("/event/count")
    //     setRegcount(res.data.count)
    // }
    // useEffect(() => {
    //     registerCount()
    // }, [])

    async function remove(id) {
        try {
            let response = await instance.delete("/event/delete/" + id)
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
                            <p><strong>Registered Gardeners: </strong>{item.count}</p>
                            <p><strong>Date & Time: </strong>{item.eventDate}, {item.eventTime}</p>
                            <div className='edit-delete-button'>
                                {/* <button className='btn btn-warning'><Link to={"/editevent/" + item._id}>EDIT</Link></button> */}
                                <button className='btn btn-danger' onClick={() => remove(item._id)}>DELETE</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ManagerViewEvent
