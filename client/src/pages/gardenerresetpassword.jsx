import React, { useState } from 'react'
import { useSearchParams } from 'react-router'
import instance from '../utils/apiClient'
function GardenerResetPassword() {
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
            await instance.post("http://localhost:8080/gardener/resetpassword", { token, password: data.password }).then(() => {
                alert("Password reset successfully")
                setError("")
            }).catch(() => {
                setError("Token Invalid")
            })
        }
    }
    return (
        <>
            <div className='gardener-reset-pass-container'>
                <form action="" className='gardener-reset-pass'>
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
export default GardenerResetPassword
