import { useState } from "react";
import { useNavigate } from "react-router";
import ManagerNavbar from "../components/managernavbar";
import "../style/garden.css";
import instance from "../utils/apiClient";

function AddGarden() {
    const Navigate = useNavigate()
    const [data, setData] = useState({
        plotName: "",
        description: "",
        location: "",
        gardenType: "",
        image: ""
    });
    const [error, setError] = useState({
        plotName: "",
        description: "",
        location: "",
        gardenType: "",
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
            plotName: "",
            description: "",
            location: "",
            gardenType: "",
            image: ""
        };
        if (!data.plotName) {
            lerror.plotName = "Plot name is required";
        }
        if (!data.description) {
            lerror.description = "Description is required";
        }
        if (!data.location) {
            lerror.location = "Location is required";
        }
        if (!data.gardenType) {
            lerror.gardenType = "Garden Type is required";
        }
        if (!data.image) {
            lerror.image = "Image is required";
        }
        setError({ ...lerror });
        if (Object.values(lerror).every((item) => item === "")) {
            try {
                const formData = new FormData();
                formData.append("plotName", data.plotName);
                formData.append("description", data.description);
                formData.append("location", data.location);
                formData.append("gardenType", data.gardenType);
                formData.append("image", data.image);
                await instance.post("/garden/add", formData);
                alert("🌿 Garden added successfully!");
                Navigate("/managerhome")
            } catch (e) {
                console.error(e);
                alert(e.response?.data?.message || "Error adding garden");
            }
        }
        else {
            alert("⚠ Please fill all fields correctly");
        }
    }
    return (
        <>
            <ManagerNavbar />
            <div className="add-garden-container">
                <div className="add-garden-form-card">
                    <h2 className="form-title">🌼 Add a New Garden</h2>
                    <form className="add-garden-form">
                        <div className="image-upload-section">
                            <label htmlFor="imageUpload" className="upload-box">
                                {preview ? (
                                    <img src={preview} alt="preview" className="preview-image" />
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
                        <div className="form-fields-section">
                            <label>Garden Name</label>
                            <input type="text" name="plotName" onChange={change} placeholder="Enter Garden Name" />
                            <p className="text-danger">{error.plotName}</p>
                            <label>Location</label>
                            <input type="text" name="location" onChange={change} placeholder="Enter Location" />
                            <p className="text-danger">{error.location}</p>
                            <label>Description</label>
                            <textarea name="description" onChange={change} placeholder="Enter a short description"></textarea>
                            <p className="text-danger">{error.description}</p>
                            <label>Garden Type</label>
                            <select name="gardenType" onChange={change}>
                                <option value="">-- Select Garden Type --</option>
                                <option value="Community Garden">Community Garden</option>
                                <option value="Rooftop Garden">Rooftop Garden</option>
                                <option value="Organic Garden">Organic Garden</option>
                                <option value="Herbal Garden">Herbal Garden</option>
                                <option value="School/College Garden">School/College Garden</option>
                                <option value="Balcony/Terrace Garden">Balcony/Terrace Garden</option>
                                <option value="Vegetable Garden">Vegetable Garden</option>
                                <option value="Fruit Garden">Fruit Garden</option>
                            </select>
                            <p className="text-danger">{error.gardenType}</p>
                            <button onClick={add} type="submit" className="add-btn">ADD GARDEN</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddGarden;
