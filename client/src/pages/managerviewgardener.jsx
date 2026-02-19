import React, { useEffect, useState } from 'react'
import ManagerNavbar from '../components/managernavbar'
import "../style/manager.css"
import instance from '../utils/apiClient'

function ManagerViewGardener() {
    const [details, setDetails] = useState([])
    async function gardenerData() {
        const response = await instance.get("/manager/viewgardener")
        setDetails(response.data.gardener)
    }
    useEffect(() => {
        gardenerData()
    }, [])
    return (
        <>
            <ManagerNavbar />
            <div className='manager-gardener'>
                <h1>Gardeners</h1>
                <div className='manager-gardener-container'>
                    {details.map((item) => (
                        <div className='manager-gardener-list'>
                            <img src={"http://localhost:8080/uploads/" + item.profilePic} alt="gardener image" />
                            <div className='manager-gardener-view'>
                                <p><strong>Name: </strong>{item.fullName}</p>
                                <p><strong>Address: </strong>{item.address}</p>
                                <p><strong>Date of Birth: </strong>{item.dob}</p>
                                <p><strong>Gender: </strong>{item.gender}</p>
                                <p><strong>Contact: </strong>{item.mobileNo}</p>
                                <p><strong>District: </strong>{item.district}</p>
                                <p><strong>City: </strong>{item.city}</p>
                                <p><strong>Skills: </strong>{item.skills}</p>
                                <p><strong>Email: </strong>{item.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ManagerViewGardener
