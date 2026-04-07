import React, { useState } from 'react'
import { useSearchParams } from 'react-router'
import "../style/manager.css"
import instance from '../utils/apiClient'

function ManagerResetPassword() {
    const [data, setData] = useState({ password: "", cpassword: "" })
    const [error, setError] = useState("")
    const [search] = useSearchParams()
    const token = search.get("token");
    function change(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    async function reset(e) {
        e.preventDefault()
        if (data.password.trim() !== "" && (data.password == data.cpassword)) {
            await instance.post("http://localhost:8080/manager/resetpassword", { token, password: data.password }).then(() => {
                alert("Password reset successfully")
                setError("")
            }).catch(() => {
                setError("Token Invalid")
            })
        }
    }
    return (
        <>
            <div className='manager-reset-pass-container'>
                <form action="" className='manager-reset-pass'>
                    <label htmlFor="password">New Password:</label>
                    <input type="password" name='password' onChange={change} />
                    <label htmlFor="cpassword">Confirm Password:</label>
                    <input type="password" onChange={change} name='cpassword' />
                    <button onClick={reset} className='btn btn-success'>RESET PASSWORD</button>
                </form>
            </div>
        </>
    )
}

export default ManagerResetPassword