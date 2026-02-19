import { AxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import "../style/gardener.css";
import instance from "../utils/apiClient";

function GardenerLogin() {
    const Navigate = useNavigate()
    const [data, setData] = useState({ email: "", password: "" })
    const [error, setError] = useState({ email: "", password: "" })
    function change(e) {
        e.preventDefault()
        setData({ ...data, [e.target.name]: e.target.value })
    }
    async function show(e) {
        e.preventDefault()
        let lerror = { email: "", password: "" }
        console.log(data)
        if (data.email == "") {
            lerror.email = "Username is required"
        }
        else {
            lerror.email = ""
        }
        if (data.password == "") {
            lerror.password = "Password is required"
        }
        else {
            lerror.password = ""
        }
        setError({ ...lerror })
        if (Object.values(lerror).every(function (item) {
            return item === ""
        })) {
            // alert("Logged in Successfully")
            try {
                let response = await instance.post("/gardener/login", data)
                const token = response.data.token
                localStorage.setItem("TOKEN", token)
                alert("Login Successfully")
                window.location.href = ("/gardenerhome")
            }
            catch (e) {
                if (e instanceof AxiosError) {
                    if (e.response?.data) {
                        alert(e.response.data.message)
                    }
                    else {
                        alert(e.message)
                    }
                }
                else {
                    alert("Login Failed")
                    console.log(e);
                }
            }
        }
        else {
            alert("Invalid Credentials")
        }
    }
    return (
        <>
            <div className=" login-form">
                <div className="home-icon">
                    <Link to="/">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="35"
                            height="35"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-house"
                        >
                            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                            <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        </svg>
                    </Link>
                </div>
                <img src="https://www.shutterstock.com/image-vector/hand-tree-logo-design-care-600nw-2417343115.jpg" alt="" />
                <form action="" className="login">
                    <h2>Login Page</h2>
                    <label htmlFor="email">Username:</label>
                    <input onChange={change} type="email" name="email" />
                    <p className="text-danger">{error.email}</p>
                    <label htmlFor="password">Password:</label>
                    <input onChange={change} type="password" name="password" />
                    <p className="text-danger">{error.password}</p>
                    <button onClick={show} className="btn btn-success" name="login">LOGIN</button>
                    <Link to="/gardenerforgotpass">Forgot Password</Link>
                </form>
            </div >
        </>
    )
}

export default GardenerLogin;