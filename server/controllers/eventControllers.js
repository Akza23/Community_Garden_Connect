const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const upload = require("../services/imageservices")
const Event = require("../models/eventSchema")
const Register = require("../models/eventregisterSchema")

router.post("/add", upload.single("image"), async (req, res) => {
    const { eventName, eventCategory, description, location, eventDate, eventTime } = req.body
    const token = req.headers.authorization.slice(7)
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    const newEvent = new Event({
        managerId: decoded.id,
        eventName,
        eventCategory,
        description,
        location,
        eventDate,
        eventTime,
        image: req.file?.filename && req.file.filename
    })
    await newEvent.save()
    res.send({
        message: "Event added succesfully", newEvent
    })
})

router.get("/view", async (req, res) => {
    const token = req.headers.authorization.slice(7)
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    const event = await Event.find({ "managerId": decoded.id }).populate("managerId").lean()
    if (event) {
        const result = await Promise.all(event.map(async (val) => {
            const count = await Register.countDocuments({ eventId: val._id })
            return { ...val, count }
        }))
        res.send({
            message: "Event view", event: result
        })
    }
    else {
        res.status(404).send({
            message: "No Data"
        })
    }
})

// router.get("/count", async (req, res) => {
//     const token = req.headers.authorization.slice(7)
//     const decoded = jwt.verify(token, process.env.JWT_TOKEN)
//     const count = await Event.countDocuments({ managerId: decoded.id })
//     res.send({ message: "Count View", count })
// })

router.put("/edit/:id", upload.single("image"), async (req, res) => {
    try {
        const token = req.headers.authorization.slice(7)
        const decoded = jwt.verify(token, process.env.JWT_TOKEN)
        const id = req.params.id
        const { eventName, eventCategory, description, location, eventDate, eventTime } = req.body
        await Event.findByIdAndUpdate(id, {
            eventName,
            eventCategory,
            description,
            location,
            eventDate,
            eventTime,
            image: req.file && req.file?.filename
        })
        res.send({
            message: "Event Updated Successfully"
        })
    }
    catch (e) {
        console.log(e)
        res.status(403).send({
            message: "Not Authorized"
        })
    }
})

router.delete("/delete/:id", async (req, res) => {
    const token = req.headers.authorization.slice(7)
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    if (decoded.id) {
        const event = await Event.deleteOne({ _id: req.params.id })
        res.send({
            message: "Deleted Successfully"
        })
    }
    else {
        res.status(404).send({
            message: "Event not deleted"
        })
    }
})

module.exports = router