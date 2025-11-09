import { useState } from "react"
import { useNavigate } from "react-router"
import Navbar from "../components/navbar"
import "../style/manager.css"
import instance from "../utils/apiClient"

function Manager() {
    const Navigate = useNavigate()
    const [data, setData] = useState({ fullName: "", address: "", contact: "", gender: "", district: "", city: "", pincode: "", email: "", profilePic: "", password: "", cpassword: "" })
    const [error, setError] = useState({ fullName: "", address: "", contact: "", gender: "", district: "", city: "", pincode: "", email: "", profilePic: "", password: "", cpassword: "" })
    function change(e) {
        e.preventDefault()
        setData({ ...data, [e.target.name]: e.target.value })
    }
    function upload(e) {
        setData({ ...data, profilePic: e.target.files[0] })
    }
    async function submit(e) {
        e.preventDefault()
        let localerror = { fullName: "", address: "", contact: "", gender: "", district: "", city: "", pincode: "", email: "", profilePic: "", password: "", cpassword: "" }
        if (data.fullName == "") {
            localerror.fullName = "Name is required"
        }
        else {
            localerror.fullName = ""
        }
        if (data.address == "") {
            localerror.address = "Address is required"
        }
        else {
            localerror.address = ""
        }
        if (data.contact == "") {
            localerror.contact = "Contact number is required"
        }
        else if (data.contact.length < 10 || data.contact.length > 10) {
            localerror.contact = "Contact number should be 10 digits"
        }
        else {
            localerror.contact = ""
        }
        if (data.gender == "") {
            localerror.gender = "Gender is required"
        }
        else {
            localerror.gender = ""
        }
        if (data.district == "") {
            localerror.district = "District is required"
        }
        else {
            localerror.district = ""
        }
        if (data.city == "") {
            localerror.city = "City is required"
        }
        else {
            localerror.city = ""
        }
        if (data.pincode == "") {
            localerror.pincode = "Pincode is required"
        }
        else if (data.pincode.length < 6 || data.pincode.length > 6) {
            localerror.pincode = "Pincode should be 6 digits"
        }
        else {
            localerror.pincode = ""
        }
        if (data.email == "") {
            localerror.email = "Email is required"
        }
        else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
            localerror.email = "Invalid Format"
        }
        else {
            localerror.email = ""
        }
        if (data.profilePic == "") {
            localerror.profilePic = "Profile picture is required"
        }
        else {
            localerror.profilePic = ""
        }
        if (data.password == "") {
            localerror.password = "Password is required"
        }
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(data.password)) {
            localerror.password = "Atleast 8 characters including 1 uppercase, 1 lowercase, 1 number and 1 special character"
        }
        else {
            localerror.password = ""
        }
        if (data.cpassword == "") {
            localerror.cpassword = "Confirm password is required"
        }
        else if (data.cpassword != data.password) {
            localerror.cpassword = "Confirm password and password should be same"
        }
        else {
            localerror.cpassword = ""
        }
        setError({ ...localerror })
        if (Object.values(localerror).every((item) => item === "")) {
            try {
                const formData = new FormData()
                formData.append("fullName", data.fullName)
                formData.append("address", data.address)
                formData.append("contact", data.contact)
                formData.append("gender", data.gender)
                formData.append("district", data.district)
                formData.append("city", data.city)
                formData.append("pincode", data.pincode)
                formData.append("email", data.email)
                formData.append("profilePic", data.profilePic)
                formData.append("password", data.password)
                const response = await instance.post("/manager/register", formData)
                alert("Registered Successfully")
                Navigate("/managerlogin")
            }
            catch (e) {
                console.error(e)
                alert(e.response?.data?.message || "Registration Error");
            }
        }
        else {
            alert("Please fill the form to register")
        }
    }
    return (
        <>
            <Navbar />
            <div className="manager-img">
                <img src="https://img.freepik.com/premium-vector/man-is-mowing-pond-with-flowers-trees-vector-flat-design_1261583-2949.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
                <div className="manager-container">
                    <form action="" className="manager-form">
                        <label htmlFor="fullName">Full Name: </label>
                        <input type="text" name="fullName" onChange={change} />
                        <p className="text-danger">{error.fullName}</p>
                        <label htmlFor="address">Address: </label>
                        <input type="text" name="address" onChange={change} />
                        <p className="text-danger">{error.address}</p>
                        <label htmlFor="contact">Contact Number: </label>
                        <input type="number" name="contact" onChange={change} />
                        <p className="text-danger">{error.contact}</p>
                        <label htmlFor="gender ">Gender: </label>
                        <div id="radio" className="d-flex gap-2">
                            <input type="radio" name="gender" value="female" onChange={change} />
                            <label htmlFor="female">Female</label>
                            <input type="radio" name="gender" value="male" onChange={change} />
                            <label htmlFor="male">Male</label>
                            <input type="radio" name="gender" value="other" onChange={change} />
                            <label htmlFor="other">Other</label>
                            <p className="text-danger">{error.gender}</p>
                        </div>
                        <label htmlFor="district">District: </label>
                        <select name="district" id="district" onChange={change} value={data.district}>
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
                        <p className="text-danger">{error.district}</p>
                        <label htmlFor="city">City: </label>
                        <input type="text" name="city" onChange={change} />
                        <p className="text-danger">{error.city}</p>
                        <label htmlFor="pincode">Pincode: </label>
                        <input type="number" name="pincode" onChange={change} />
                        <p className="text-danger">{error.pincode}</p>
                        <label htmlFor="email">Email: </label>
                        <input type="email" name="email" onChange={change} />
                        <p className="text-danger">{error.email}</p>
                        <label htmlFor="profilePic">Profile Picture: </label>
                        <input type="file" name="profilePic" onChange={upload} />
                        <p className="text-danger">{error.profilePic}</p>
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" onChange={change} />
                        <p className="text-danger">{error.password}</p>
                        <label htmlFor="cpassword">Confirm Password: </label>
                        <input type="password" name="cpassword" onChange={change} />
                        <p className="text-danger">{error.cpassword}</p>
                        <button value="submit" className="btn btn-success" onClick={submit}>REGISTER</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Manager