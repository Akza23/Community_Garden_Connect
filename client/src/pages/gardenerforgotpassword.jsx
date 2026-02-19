import React, { useState } from 'react'
import instance from '../utils/apiClient'

function GardenerForgotPassword() {
    const [data, setData] = useState({ email: "" })
    async function forgot(e) {
        e.preventDefault()
        const response = await instance.post("http://localhost:8080/gardener/forgotpassword", data).then(() => {
            alert("Password changed mail sent successfully")
        }).catch(() => {
            alert("Error")
        })
    }
    function change(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className='gardener-forgot-pass-container'>
                <form action="" className='gardener-forgot-pass'>
                    <label htmlFor="email">Username: </label>
                    <input type="email" onChange={change} name='email' />
                    <button className='btn btn-success' onClick={forgot}>RESET</button>
                </form>
            </div>
        </>
    )
}

export default GardenerForgotPassword
