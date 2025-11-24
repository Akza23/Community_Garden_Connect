import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import ManagerNavbar from '../components/managernavbar'
import "../style/garden.css"
import instance from '../utils/apiClient'

function EditGarden() {
    const [details, setDetails] = useState({})
    const [preview, setPreview] = useState(null)
    const navigate = useNavigate()
    const { id } = useParams()

    async function getDetails() {
        const response = await instance.get("/garden/view")
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
        const file = e.target.files[0];
        setDetails({ ...details, image: file });
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    }

    async function edit(e) {
        e.preventDefault()
        try {
            const formData = new FormData();
            formData.append("plotName", details.plotName);
            formData.append("description", details.description);
            formData.append("location", details.location);
            formData.append("gardenType", details.gardenType);
            formData.append("image", details.image);
            await instance.put("/garden/edit/" + id, formData)
            alert("Garden details updated successfully")
            navigate("/managerviewgarden")
        } catch (e) {
            console.log(e);
            alert("Update failed")
        }
    }

    return (
        <>
            <ManagerNavbar />
            <div className="edit-garden-container">
                <div className="edit-garden-card">
                    <h2 className="edit-title">Edit Garden Details</h2>
                    <form className="edit-form" onSubmit={edit}>
                        <div className="edit-image-section">
                            <label htmlFor="imageUpload" className="upload-box">
                                {preview ? (
                                    <img src={preview} alt="preview" className="preview-image" />
                                ) : (
                                    details?.image ?
                                        <img src={`http://localhost:8080/uploads/${details.image}`} alt="preview" className="preview-image" />
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
                        <div className="edit-fields">
                            <label>Garden Name</label>
                            <input
                                type="text"
                                name="plotName"
                                value={details?.plotName}
                                onChange={change}
                            />
                            <label>Location</label>
                            <input
                                type="text"
                                name="location"
                                value={details?.location}
                                onChange={change}
                            />
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={details?.description}
                                onChange={change}
                            />
                            <label>Garden Type</label>
                            <select
                                name="gardenType"
                                value={details?.gardenType}
                                onChange={change}
                            >
                                <option value="">-- Select Garden Type --</option>
                                <option value="community">Community Garden</option>
                                <option value="rooftop">Rooftop Garden</option>
                                <option value="organic">Organic Garden</option>
                                <option value="herbal">Herbal Garden</option>
                                <option value="school/college">School/College Garden</option>
                                <option value="balcony/terrace">Balcony/Terrace Garden</option>
                                <option value="vegetable">Vegetable Garden</option>
                                <option value="fruit">Fruit Garden</option>
                            </select>
                            <button className="garden-edit-btn" type="submit">
                                UPDATE GARDEN
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditGarden
