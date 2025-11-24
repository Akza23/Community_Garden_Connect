import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import ManagerNavbar from '../components/managernavbar'
import instance from '../utils/apiClient'

function ManagerProfileEdit() {
    const Navigate = useNavigate()
    const [details, setDetails] = useState({})
    const [file, setFile] = useState(null)
    async function getDetails() {
        const response = await instance.get("/manager/profile")
        setDetails(response.data.manager)
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
            formData.append("contact", details.contact)
            formData.append("district", details.district)
            formData.append("city", details.city)
            formData.append("pincode", details.pincode)
            formData.append("email", details.email)
            formData.append("profilePic", details.profilePic)
            const response = await instance.put("/manager/updateprofile", formData)
            alert("Manager Updated Successfully")
            Navigate("/managerprofile")
        }
        catch (e) {
            console.error(e)
            alert("Updated Failed")
        }
    }
    return (
        <>
            <ManagerNavbar />
            <div className="manager-profile-edit">
                <form className="manager-profile-form">
                    <h2>Edit Profile</h2>
                    <div className="form-row">
                        <div>
                            <label>Full Name:</label>
                            <input type="text" name="fullName" value={details.fullName || ""} onChange={change} />
                        </div>
                        <div>
                            <label>Address:</label>
                            <input type="text" name="address" value={details.address || ""} onChange={change} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div>
                            <label>Contact Number:</label>
                            <input type="number" name="contact" value={details.contact || ""} onChange={change} />
                        </div>
                        <div>
                            <label>District:</label>
                            <select name="district" value={details.district || ""} onChange={change}>
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
                    </div>
                    <div className="form-row">
                        <div>
                            <label>City:</label>
                            <input type="text" name="city" value={details.city || ""} onChange={change} />
                        </div>
                        <div>
                            <label>Pincode:</label>
                            <input type="number" name="pincode" value={details.pincode || ""} onChange={change} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div>
                            <label>Email:</label>
                            <input type="email" name="email" value={details.email || ""} onChange={change} />
                        </div>
                        <div className="file-box">
                            <label>Profile Picture:</label>
                            <input type="file" name="profilePic" onChange={upload} />
                        </div>
                    </div>
                    <button type="submit" onClick={update}>Update</button>
                </form>
            </div>
        </>
    )
}

export default ManagerProfileEdit