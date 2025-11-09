import { AxiosError } from "axios";
import { useState } from "react";
import "../style/manager.css";
import instance from "../utils/apiClient";

function ManagerLogin() {
    const [data, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState({ email: "", password: "" });
    function change(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    async function show(e) {
        e.preventDefault();
        let lerror = { email: "", password: "" };
        console.log(data);
        if (data.email === "") {
            lerror.email = "Username is required";
        }
        if (data.password === "") {
            lerror.password = "Password is required";
        }
        setError({ ...lerror });
        if (Object.values(lerror).every((item) => item === "")) {
            try {
                let response = await instance.post("/manager/login", data);
                const token = response.data.token;
                localStorage.setItem("TOKEN", token);
                alert("Logged in Successfully");
            } catch (e) {
                if (e instanceof AxiosError) {
                    if (e.response?.data) {
                        alert(e.response.data.message);
                    } else {
                        alert(e.message);
                    }
                } else {
                    alert("Login Failed");
                    console.log(e);
                }
            }
        } else {
            alert("Invalid Credentials");
        }
    }

    return (
        <div>
            <form className="manager-login">
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
    );
}

export default ManagerLogin;
