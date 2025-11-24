import { AxiosError } from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router'
import "../style/admin.css"
import instance from '../utils/apiClient'

function AdminLogin() {
    const [data, setData] = useState({ email: "", password: "" })
    const [error, setError] = useState({ email: "", password: "" })
    function change(e) {
        e.preventDefault()
        setData({ ...data, [e.target.name]: e.target.value })
    }
    async function show(e) {
        e.preventDefault()
        let lerror = { email: "", password: "" }
        if (!data.email) {
            lerror.email = "Email is required"
        }
        if (!data.password) {
            lerror.password = "Password is required"
        }
        setError({ ...lerror })
        if (Object.values(lerror).every((item) => {
            return item === ""
        })) {
            try {
                let response = await instance.post("/admin/login", data)
                const token = response.data.token
                localStorage.setItem("TOKEN", token)
                alert("Logged in Successfully")
                window.location.href = ("/adminhome")
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
                    console.log(e)
                }
            }
        }
        else {
            alert("Invalid Credentials")
        }
    }
    return (
        <>
            <div className="admin-container">
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
                <img src="https://img.freepik.com/premium-vector/simple-logo-design-community-outreach-program-design-simple-logo-community-outreach-program-supporting-local-small-businesses_538213-67962.jpg?semt=ais_incoming&w=740&q=80" alt="" />
                <form className="admin-login">
                    <h2>Login Page</h2>
                    <label htmlFor="email">Username:</label>
                    <input onChange={change} type="email" name="email" />
                    <p className="text-danger">{error.email}</p>
                    <label htmlFor="password">Password:</label>
                    <input onChange={change} type="password" name="password" />
                    <p className="text-danger">{error.password}</p>
                    <button onClick={show} className="btn btn-success" name="login">
                        LOGIN
                    </button>
                </form>
            </div>
        </>
    )
}

export default AdminLogin
