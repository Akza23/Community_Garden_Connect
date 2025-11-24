import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import GardenerNavbar from "../components/gardenernavbar"
import "../style/gardener.css"
import instance from "../utils/apiClient"

function GardenerProfileEdit() {
    const [details, setDetails] = useState({})
    const [file, setFile] = useState(null)
    const navigate = useNavigate()

    async function getDetails() {
        const response = await instance.get("/gardener/profile")
        setDetails(response.data.gardener)
    }
    useEffect(() => {
        getDetails()
    }, [])
    function change(e) {
        setDetails({ ...details, [e.target.name]: e.target.value })
    }
    function upload(e) {
        setFile(e.target.files[0])
    }
    async function update(e) {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append("fullName", details.fullName)
            formData.append("address", details.address)
            formData.append("dob", details.dob)
            formData.append("mobileNo", details.mobileNo)
            formData.append("district", details.district)
            formData.append("city", details.city)
            formData.append("skilla", details.skills)
            formData.append("email", details.email)
            formData.append("profilePic", details.profilePic)
            await instance.put("/gardener/updateprofile", formData)
            alert("Updated Successfully!")
            navigate("/gardenerprofile")
        } catch {
            alert("Update Failed")
        }
    }
    return (
        <>
            <GardenerNavbar />
            <div className="gardener-profile-update-container">
                <div className="profile-update-card">
                    <h2>Edit Profile</h2>
                    <form className="profile-update-form">
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Full Name:</label>
                                <input type="text" name="fullName" value={details?.fullName} onChange={change} />
                            </div>
                            <div className="form-group">
                                <label>Address:</label>
                                <input type="text" name="address" value={details?.address} onChange={change} />
                            </div>
                            <div className="form-group">
                                <label>Date of Birth:</label>
                                <input type="date" name="dob" value={details?.dob} onChange={change} />
                            </div>
                            <div className="form-group">
                                <label>Contact Number:</label>
                                <input type="number" name="mobileNo" value={details?.mobileNo} onChange={change} />
                            </div>
                            <div className="form-group">
                                <label>District:</label>
                                <select name="district" value={details?.district} onChange={change}>
                                    <option value="">-- Select District --</option>
                                    <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                                    <option value="Kollam">Kollam</option>
                                    <option value="Pathanamthitta">Pathanamthitta</option>
                                    <option value="Alappuzha">Alappuzha</option>
                                    <option value="Kottayam">Kottayam</option>
                                    <option value="Idukki">Idukki</option>
                                    <option value="Ernakulam">Ernakulam</option>
                                    <option value="Thrissur">Thrissur</option>
                                    <option value="Palakkad">Palakkad</option>
                                    <option value="Malappuram">Malappuram</option>
                                    <option value="Kozhikode">Kozhikode</option>
                                    <option value="Wayanad">Wayanad</option>
                                    <option value="Kannur">Kannur</option>
                                    <option value="Kasaragod">Kasaragod</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>City:</label>
                                <input type="text" name="city" value={details?.city} onChange={change} />
                            </div>
                            <div className="form-group">
                                <label>Skills:</label>
                                <input type="text" name="skills" value={details?.skills} onChange={change} />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input type="email" name="email" value={details?.email} onChange={change} />
                            </div>
                            <div className="form-group full-width">
                                <label>Profile Picture:</label>
                                <input type="file" name="profilePic" onChange={upload} />
                            </div>
                        </div>
                        <button type="submit" onClick={update} className="update-button">Update</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default GardenerProfileEdit