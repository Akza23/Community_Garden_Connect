import React, { useEffect, useState } from 'react'
import GardenerNavbar from '../components/gardenernavbar'
import instance from '../utils/apiClient'

function GardenerViewTask() {
    const [details, setDetails] = useState([])
    const [refresh, setRefresh] = useState(false)
    async function getTaskData() {
        const response = await instance.get("/gardener/viewtask")
        setDetails(response.data.task)
    }
    useEffect(() => {
        getTaskData()
    }, [refresh])

    async function updatestatus(e, item) {
        const response = await instance.put("/task/updatestatus/" + item._id, { status: e.target.value })
        setRefresh(!refresh)
    }
    return (
        <>
            <GardenerNavbar />
            <table className='gardener-task-table'>
                <thead className='gardener-task-thead'>
                    <tr>
                        <th>Task Category</th>
                        <th>Description</th>
                        <th>Garden</th>
                        <th>Start Date</th>
                        <th>Due Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody className='gardener-task-tbody'>
                    {details.map((item) => (
                        <tr>
                            <td>{item.taskCategory}</td>
                            <td>{item.description}</td>
                            <td>{item.selectGarden.plotName}</td>
                            <td>{new Date(item.startDate).toLocaleString()}</td>
                            <td>{new Date(item.dueDate).toLocaleString()}</td>
                            <td>
                                <select onChange={(e) => updatestatus(e, item)} name="status" value={item.status} className='task-status-select'>
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default GardenerViewTask