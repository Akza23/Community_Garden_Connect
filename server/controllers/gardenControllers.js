const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const upload = require("../services/imageservices")
const Garden = require("../models/gardenSchema")

router.post("/add", upload.single("image"), async (req, res) => {
    const { plotName, description, location, gardenType } = req.body
    const token = req.headers.authorization.slice(7)
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    const newGarden = new Garden({
        managerId: decoded.id,
        plotName,
        description,
        location,
        gardenType,
        image: req.file?.filename && req.file.filename
    })
    await newGarden.save()
    res.send({
        message: "Garden added succesfully", newGarden
    })
})

router.get("/view", upload.single("image"), async (req, res) => {
    const token = req.headers.authorization.slice(7)
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    const garden = await Garden.find({ "managerId": decoded.id }).populate("managerId")
    if (garden) {
        res.send(garden)
    }
    else {
        res.status(404).send({
            message: "No Data"
        })
    }
})

router.put("/edit/:id", upload.single("image"), async (req, res) => {
    try {
        const token = req.headers.authorization.slice(7)
        const decoded = jwt.verify(token, process.env.JWT_TOKEN)
        const id = req.params.id
        const { plotName, location, description, gardenType } = req.body
        await Garden.findByIdAndUpdate(id, {
            plotName,
            location,
            description,
            gardenType,
            image: req.file && req.file?.filename
        })
        res.send({
            message: "Garden Update Successfully"
        })
    }
    catch (e) {
        console.log(e);
        res.status(403).send({
            message: "Not Authorized"
        })
    }
})

router.delete("/delete/:id", async (req, res) => {
    const token = req.headers.authorization.slice(7)
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    if (decoded.id) {
        const garden = await Garden.deleteOne({ _id: req.params.id })
        res.send({
            message: "Deleted Successfully"
        })
    }
    else {
        res.status(404).send({
            message: "Garden not deleted"
        })
    }
})

module.exports = router