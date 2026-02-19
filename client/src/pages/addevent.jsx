import { useState } from "react";
import { useNavigate } from "react-router";
import ManagerNavbar from "../components/managernavbar";
import "../style/event.css";
import instance from "../utils/apiClient";

function AddEvent() {
    const Navigate = useNavigate()
    const [data, setData] = useState({
        eventName: "",
        eventCategory: "",
        description: "",
        location: "",
        eventDate: "",
        eventTime: "",
        image: ""
    });
    const [error, setError] = useState({
        eventName: "",
        eventCategory: "",
        description: "",
        location: "",
        eventDate: "",
        eventTime: "",
        image: ""
    });
    const [preview, setPreview] = useState(null);
    function change(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    function upload(e) {
        const file = e.target.files[0];
        setData({ ...data, image: file });
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    }
    async function add(e) {
        e.preventDefault();
        let lerror = {
            eventName: "",
            description: "",
            location: "",
            eventDate: "",
            eventTime: "",
            image: ""
        };
        if (!data.eventName) {
            lerror.eventName = "Event name is required";
        }
        if (!data.eventCategory) {
            lerror.eventCategory = "Event category is required";
        }
        if (!data.description) {
            lerror.description = "Description is required";
        }
        if (!data.location) {
            lerror.location = "Location is required";
        }
        if (!data.eventDate) {
            lerror.eventDate = "Date is required";
        }
        if (!data.eventTime) {
            lerror.eventTime = "Time is required";
        }
        if (!data.image) {
            lerror.image = "Image is required";
        }
        setError({ ...lerror });
        if (Object.values(lerror).every((item) => item === "")) {
            try {
                const formData = new FormData();
                formData.append("eventName", data.eventName);
                formData.append("eventCategory", data.eventCategory);
                formData.append("description", data.description);
                formData.append("location", data.location);
                formData.append("eventDate", data.eventDate);
                formData.append("eventTime", data.eventTime);
                formData.append("image", data.image);
                await instance.post("/event/add", formData);
                alert("🌿 Event added successfully!");
                Navigate("/managerhome")
            } catch (e) {
                console.error(e);
                alert(e.response?.data?.message || "Error adding event");
            }
        }
        else {
            alert("⚠ Please fill all fields correctly");
        }
    }
    return (
        <>
            <ManagerNavbar />
            <div className="add-event-container">
                <div className="add-event-form-card">
                    <h2 className="event-form-title">🌼 Add a New Event</h2>
                    <form className="add-event-form">
                        <div className="event-image-upload">
                            <label htmlFor="imageUpload" className="event-upload-box">
                                {preview ? (
                                    <img src={preview} alt="preview" className="event-preview-image" />
                                ) : (
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
                            <p className="text-danger">{error.image}</p>
                        </div>
                        <div className="event-form-section">
                            <label>Event Name</label>
                            <input type="text" name="eventName" onChange={change} placeholder="Enter Event Name" />
                            <p className="text-danger">{error.eventName}</p>
                            <label>Event Category</label>
                            <select name="eventCategory" onChange={change}>
                                <option value="">-- Select Event Type --</option>
                                <option value="Plantation">Plantation</option>
                                <option value="Workshop">Workshop</option>
                                <option value="Awareness Program">Awareness Program</option>
                                <option value="Community Meeting">Community Meeting</option>
                                <option value="Harvest Event">Harvest Event</option>
                            </select>
                            <p className="text-danger">{error.eventCategory}</p>
                            <label>Description</label>
                            <textarea name="description" onChange={change} placeholder="Enter a short description"></textarea>
                            <p className="text-danger">{error.description}</p>
                            <label>Location</label>
                            <input type="text" name="location" onChange={change} placeholder="Enter Location" />
                            <p className="text-danger">{error.location}</p>
                            <label>Event Date</label>
                            <input type="date" name="eventDate" onChange={change} placeholder="Enter Date" />
                            <p className="text-danger">{error.eventDate}</p>
                            <label>Event Time</label>
                            <input type="time" name="eventTime" onChange={change} placeholder="Enter Time" />
                            <p className="text-danger">{error.eventTime}</p>
                            <button onClick={add} type="submit" className="event-btn">ADD EVENT</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddEvent;