const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const ManagerVerify = require("../middlewares/managermiddleware")
const Task = require("../models/taskSchema")
const Garden = require("../models/gardenSchema")
const Gardener = require("../models/gardenerSchema")

router.post("/add", async (req, res) => {
    const { taskCategory, description, selectGarden, assignGardener, startDate, dueDate } = req.body
    const token = req.headers.authorization.slice(7)
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    const newTask = new Task({
        managerId: decoded.id,
        gardenerId: decoded.id,
        taskCategory,
        description,
        selectGarden,
        assignGardener,
        startDate,
        dueDate
    })
    await newTask.save()
    res.send({
        message: "Task added Successfully", newTask
    })
})

router.get("/getgarden", async (req, res) => {
    const token = req.headers.authorization.slice(7)
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    const getGarden = await Garden.find({ managerId: decoded.id }).select("plotName")
    res.send({ message: "Garden Name", getGarden })
})

router.get("/getgardener", async (req, res) => {
    const token = req.headers.authorization.slice(7)
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    const getGardener = await Gardener.find().select("fullName")
    // console.log("Found Gardeners:", getGardener)
    res.send({ message: "Gardener Name", getGardener })
})

router.get("/view", async (req, res) => {
    const token = req.headers.authorization.slice(7)
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    const task = await Task.find({ "managerId": decoded.id }).populate("managerId assignGardener selectGarden")
    if (task) {
        res.send(task)
    }
    else {
        res.status(404).send({
            message: "No Data"
        })
    }
})

router.put("/updatestatus/:id", async (req, res) => {
    const token = req.headers.authorization.slice(7)
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    const updatetask = await Task.findByIdAndUpdate(req.params.id, { status: req.body.status })
    res.send({ message: "Status Updated", updatetask })
})

module.exports = router