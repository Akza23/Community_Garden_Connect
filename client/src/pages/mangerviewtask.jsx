import { useEffect, useState } from "react"
import ManagerNavbar from "../components/managernavbar"
import "../style/task.css"
import instance from "../utils/apiClient"

function ManagerViewTask() {
    const [details, setDetails] = useState([])
    async function getTaskData() {
        const response = await instance.get("/task/view")
        setDetails(response.data)
    }
    useEffect(() => {
        getTaskData()
    }, [])
    return (
        <>
            <ManagerNavbar />
            <table className="task-table">
                <thead className="task-thead">
                    <tr className="task-tr">
                        <th>Task Category</th>
                        <th>Description</th>
                        <th>Garden</th>
                        <th>Gardener</th>
                        <th>Start Date</th>
                        <th>Due Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="task-tbody">
                    {details.map((item) => {
                        return (
                            <tr>
                                <td>{item.taskCategory}</td>
                                <td>{item.description}</td>
                                <td>{item.selectGarden.plotName}</td>
                                <td>{item.assignGardener.fullName}</td>
                                <td>{item.startDate}</td>
                                <td>{item.dueDate}</td>
                                <td>{item.status}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default ManagerViewTask