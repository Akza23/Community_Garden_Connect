import { useState } from "react"
import Navbar from "../components/navbar";
import axios from "axios";
import "../style/gardener.css"
function Gardener() {
    const [data, setData] = useState({ fullName: "", address: "", age: "", gender: "", mobileNo: "", district: "", city: "", emailId: "", password: "", cpassword: "", profilePic: "" })
    const [error, setError] = useState({ fullName: "", address: "", age: "", gender: "", mobileNo: "", district: "", city: "", emailId: "", password: "", cpassword: "", profilePic: "" })
    function change(e) {
        e.preventDefault()
        setData({ ...data, [e.target.name]: e.target.value })
    }
    function upload(e) {
        setData({ ...data, profilePic: e.target.files[0] });
    }
    function submit(e) {
        e.preventDefault()
        let localerror = { fullName: "", address: "", age: "", gender: "", mobileNo: "", district: "", city: "", emailId: "", password: "", cpassword: "", profilePic: "" }
        console.log(data)
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
        if (data.age == "") {
            localerror.age = "Age is required"
        }
        else if (data.age <= 0 || data.age >= 99) {
            localerror.age = "Age should be between 1 and 99"
        }
        else {
            localerror.age = ""
        }
        if (data.gender == "") {
            localerror.gender = "Gender is required"
        }
        else {
            localerror.gender = ""
        }
        if (data.mobileNo == "") {
            localerror.mobileNo = "Contact number is required"
        }
        else if (data.mobileNo.length < 10) {
            localerror.mobileNo = "Contact number should be 10 digits"
        }
        else {
            localerror.mobileNo = ""
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
        if (data.emailId == "") {
            localerror.emailId = "Email is required"
        }
        else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.emailId)) {
            localerror.emailId = "Invalid Email"
        }
        else {
            localerror.emailId = ""
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
            localerror.cpassword = "Confirm Password is required"
        }
        else if (data.cpassword != data.password) {
            localerror.cpassword = "Password and Confirm Password should be same"
        }
        else {
            localerror.cpassword = ""
        }
        if (data.profilePic == "") {
            localerror.profilePic = "Profile Picture is required"
        }
        else {
            localerror.profilePic = ""
        }
        console.log(Object.values(error))
        setError({ ...localerror })
        if (Object.values(localerror).every((item) => item === "")) {
            const formData = new FormData();
            for (let key in data) {
                formData.append(key, data[key]);
            }
            axios.post("http://localhost:8080/sample/register", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                .then((res) => {
                    alert("Registered Successfully");
                    console.log(res.data);
                })
                .catch((err) => {
                    console.error("Error submitting form:", err);
                });
        } else {
            alert("Please fill the form to register");
        }
    }
    return (
        <>
            <Navbar />
            <div className="form-img">
                <img src="https://images.unsplash.com/photo-1495908333425-29a1e0918c5f?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                <div className="container">
                    <form action="" className="form">
                        <h2 id="h4">Registration</h2>
                        <label htmlFor="fullName">Full Name: </label>
                        <input onChange={change} type="text" name="fullName" />
                        <p className="text-danger">{error.fullName}</p>
                        <label htmlFor="address">Address: </label>
                        <input onChange={change} type="text" name="address" />
                        <p className="text-danger">{error.address}</p>
                        <label htmlFor="age">Age: </label>
                        <input onChange={change} type="number" name="age" />
                        <p className="text-danger">{error.age}</p>
                        <label htmlFor="gender">Gender: </label>
                        <div id="radio" className="d-flex gap-2">
                            <input onChange={change} type="radio" name="gender" value="female" />
                            <label htmlFor="female">Female</label>
                            <input onChange={change} type="radio" name="gender" value="male" />
                            <label htmlFor="male">Male</label>
                            <input onChange={change} type="radio" name="gender" value="other" />
                            <label htmlFor="male">Other</label>
                            <p className="text-danger">{error.gender}</p>
                        </div>
                        <label htmlFor="mobileNo">Contact Number: </label>
                        <input onChange={change} type="number" name="mobileNo" />
                        <p className="text-danger">{error.mobileNo}</p>
                        <label htmlFor="district">District: </label>
                        <input onChange={change} type="text" name="district" />
                        <p className="text-danger">{error.district}</p>
                        <label htmlFor="city">City: </label>
                        <input onChange={change} type="text" name="city" />
                        <p className="text-danger">{error.city}</p>
                        <label htmlFor="emailId">Email: </label>
                        <input onChange={change} type="email" name="emailId" />
                        <p className="text-danger">{error.emailId}</p>
                        <label htmlFor="password">Password: </label>
                        <input onChange={change} type="password" name="password" />
                        <p className="text-danger">{error.password}</p>
                        <label htmlFor="cpassword">Confirm Password: </label>
                        <input onChange={change} type="password" name="cpassword" />
                        <p className="text-danger">{error.cpassword}</p>
                        <label htmlFor="profilePic">Profile Picture</label>
                        <input onChange={upload} type="file" name="profilePic" />
                        <p className="text-danger">{error.profilePic}</p>
                        <button onClick={submit} value="submit" className="btn btn-success">REGISTER</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Gardener;