const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const adminVerify = require("../middlewares/adminmiddleware")
const Gardener = require("../models/gardenerSchema")
const Manager = require("../models/managerSchema")
const Garden = require("../models/gardenSchema")

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    if (email == "admin@gmail.com" && password == "Admin@123") {
        const token = jwt.sign({ admin: true }, process.env.JWT_TOKEN)
        res.send({
            message: "Login Successfully", token
        })
    }
    else {
        res.status(404).send({
            message: "Login Failed"
        })
    }
})

router.get("/viewgardener", adminVerify, async (req, res) => {
    const gardener = await Gardener.find()
    res.send({
        message: "Registered Gardeners", gardener
    })
})

router.get("/viewmanager", adminVerify, async (req, res) => {
    const manager = await Manager.find()
    res.send({
        message: "Registered Garden Managers", manager
    })
})

router.get("/viewgardens", adminVerify, async (req, res) => {
    const garden = await Garden.find()
    res.send({
        message: "Garden Plots", garden
    })
})

router.patch("/activate", adminVerify, async (req, res) => {
    const managerid = req.body.managerid
    const manager = await Manager.findByIdAndUpdate(managerid, { Activated: true })
    res.send({
        message: "Manager Activated", manager
    })
})

router.patch("/deactivate", adminVerify, async (req, res) => {
    const managerid = req.body.managerid
    const manager = await Manager.findByIdAndUpdate(managerid, { Activated: false })
    res.send({
        message: "Manager Rejected", manager
    })
})

module.exports = router