import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import ManagerNavbar from "../components/managernavbar"
import "../style/task.css"
import instance from '../utils/apiClient'

function AddTask() {
    const Navigate = useNavigate()
    const [garden, setGarden] = useState([])
    const [gardener, setGardener] = useState([])
    const [data, setData] = useState({ taskCategory: "", description: "", selectGarden: "", assignGardener: "", startDate: "", dueDate: "" })
    const [error, setError] = useState({ taskCategory: "", description: "", selectGarden: "", assignGardener: "", startDate: "", dueDate: "" })
    function change(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    async function submit(e) {
        e.preventDefault()
        let lerror = { taskCategory: "", description: "", selectGarden: "", assignGardener: "", startDate: "", dueDate: "" }
        if (!data.taskCategory) {
            lerror.taskCategory = "Task Category is required";
        }
        if (!data.description) {
            lerror.description = "Description is required";
        }
        if (!data.selectGarden) {
            lerror.selectGarden = "Garden is required";
        }
        if (!data.assignGardener) {
            lerror.assignGardener = "Gardener is required";
        }
        if (!data.startDate) {
            lerror.startDate = "Start Date is required";
        }
        if (!data.dueDate) {
            lerror.dueDate = "Due Date is required";
        }
        setError({ ...lerror })
        if (Object.values(lerror).every((item) => item === "")) {
            try {
                let response = await instance.post("/task/add", data)
                const token = response.data.token
                localStorage.setItem("TOKEN", token)
                alert("Task added successfully!")
                Navigate("/managerhome")
            }
            catch (e) {
                console.error(e)
                alert("Error adding task")
            }
        }
        else {
            alert("⚠ Please fill all fields correctly")
        }
    }
    async function getGardenData() {
        const response = await instance.get("/task/getgarden")
        setGarden(response.data.getGarden)
    }
    useEffect(() => {
        getGardenData()
    }, [])
    async function getGardenerData() {
        const response = await instance.get("/task/getgardener")
        setGardener(response.data.getGardener)
    }
    useEffect(() => {
        getGardenerData()
    }, [])
    return (
        <>
            <ManagerNavbar />
            <div className='add-task-container'>
                <form action="" className='add-task'>
                    <label htmlFor="taskCategory">Task Category:</label>
                    <select name="taskCategory" onChange={change}>
                        <option value="taskCategory">-- Select Category --</option>
                        <option value="watering">Watering</option>
                        <option value="weeding">Weeding</option>
                        <option value="fertilizing">Fertilizing</option>
                        <option value="generalmaintenance">General Maintenance</option>
                        <option value="planting">Planting</option>
                    </select>
                    <label htmlFor="description">Description: </label>
                    <textarea name="description" onChange={change}></textarea>
                    <label htmlFor="selectGarden">Garden: </label>
                    <select name="selectGarden" onChange={change}>
                        <option value="">-- Select Garden Plot --</option>
                        
                        {garden.map((item) => {
                            return (
                                <option value={item._id}>{item.plotName}</option>
                            )
                        })}
                    </select>
                    <label htmlFor="assignGardener">Gardener: </label>
                    <select name="assignGardener" onChange={change}>
                        <option value="">-- Assign Gardener --</option>
                        {gardener.map((item) => {
                            return (
                                <option value={item._id}>{item.fullName}</option>
                            )
                        })}
                    </select>
                    <label htmlFor="startDate">Start Date: </label>
                    <input type="datetime-local" name='startDate' onChange={change} />
                    <label htmlFor="dueDate">Due Date: </label>
                    <input type="datetime-local" name='dueDate' onChange={change} />
                    <button value="submit" onClick={submit}>ADD</button>
                </form>
            </div>
        </>
    )
}

export default AddTask
