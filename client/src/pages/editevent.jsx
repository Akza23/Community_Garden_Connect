import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import ManagerNavbar from '../components/managernavbar'
import instance from '../utils/apiClient'

function EditEvent() {
    const [details, setDetails] = useState([])
    const [preview, setPreview] = useState(null)
    const Navigate = useNavigate()
    const { id } = useParams()

    async function getDetails() {
        const response = await instance.get("/event/view")
        let idx = response.data.findIndex((i) => (i._id == id))
        setDetails(response.data[idx])
    }
    useEffect(() => {
        getDetails()
    }, [])
    function change(e) {
        setDetails({ ...details, [e.target.name]: e.target.value })
    }
    function upload(e) {
        const file = e.target.files[0]
        setDetails({ ...details, image: file })
        if (file) {
            setPreview(URL.createObjectURL(file))
        }
    }
    async function edit(e) {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append("eventName", details.eventName)
            formData.append("eventCategory", details.eventCategory)
            formData.append("description", details.description)
            formData.append("location", details.location)
            formData.append("eventDate", details.eventDate)
            formData.append("eventTime", details.eventTime)
            formData.append("image", details.image)
            await instance.put("/event/edit/" + id, formData)
            alert("Event details updated successfully")
            Navigate("/managerviewevent")
        }
        catch (e) {
            console.log(e)
            alert("Update failed")
        }
    }
    return (
        <>
            <ManagerNavbar />
            <div className="edit-event-container">
                <div className="edit-event-card">
                    <h2 className="event-title">Edit Event Details</h2>
                    <form className="event-form" onSubmit={edit}>
                        <div className="event-image-section">
                            <label htmlFor="imageUpload" className="event-upload-box">
                                {preview ? (
                                    <img src={preview} alt="preview" className="preview-upload-image" />
                                ) : (
                                    details?.image ?
                                        <img src={`http://localhost:8080/uploads/${details.image}`} alt="preview" className="preview-upload-image" />
                                        :
                                        <span>Click to upload image</span>
                                )}
                            </label>
                            <input
                                id="imageUpload"
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={upload}
                                hidden
                            />
                        </div>
                        <div className="event-fields">
                            <label>Event Name</label>
                            <input
                                type="text"
                                name="eventName"
                                value={details?.eventName}
                                onChange={change}
                            />
                            <label>Event Category</label>
                            <select
                                name="eventCategory"
                                value={details?.eventCategory}
                                onChange={change}
                            >
                                <option value="">-- Select Event Type --</option>
                                <option value="Plantation">Plantation</option>
                                <option value="Workshop">Workshop</option>
                                <option value="Awareness Program">Awareness Program</option>
                                <option value="Community Meeting">Community Meeting</option>
                                <option value="Harvest Event">Harvest Event</option>
                            </select>
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={details?.description}
                                onChange={change}
                            />
                            <label>Location</label>
                            <input
                                type="text"
                                name="location"
                                value={details?.location}
                                onChange={change}
                            />
                            <label>Event Date</label>
                            <input type="date"
                                name="eventDate"
                                value={details?.eventDate}
                                onChange={change}
                            />
                            <label>Event Time</label>
                            <input type="time"
                                name="eventTime"
                                value={details?.eventTime}
                                onChange={change}
                            />
                            <button className="event-edit-btn" type="submit">
                                UPDATE EVENT
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditEvent
