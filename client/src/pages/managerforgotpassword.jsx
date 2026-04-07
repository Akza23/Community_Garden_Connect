import { useState } from "react"
import { useNavigate } from "react-router"
import "../style/manager.css"
import instance from "../utils/apiClient"

function ManagerForgotPassword() {
    const Navigate = useNavigate()
    const [data, setData] = useState({ email: "" })
    function change(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    async function forgot(e) {
        e.preventDefault()
        const response = await instance.post("http://localhost:8080/manager/forgotpassword", data).then(() => {
            alert("Password changed mail sent successfully")
            Navigate("/managerlogin")
        }).catch(() => {
            alert("Error")
        })
    }
    return (
        <>
            <div className='manager-forgot-pass-container'>
                <form action="" className='manager-forgot-pass'>
                    <label htmlFor="email">Username: </label>
                    <input type="email" onChange={change} name="email" />
                    <button className='btn btn-success' onClick={forgot}>RESET</button>
                </form>
            </div>
        </>
    )
}

export default ManagerForgotPassword