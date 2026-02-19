const express = require("express")
const router = express.Router()
const upload = require("../services/imageservices")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Manager = require("../models/managerSchema")
const Gardener = require("../models/gardenerSchema")
const Chat = require("../models/chatSchema")

router.post("/register", upload.single("profilePic"), async (req, res) => {
    const { fullName, address, contact, gender, district, city, pincode, email, password } = req.body
    const hashPassword = bcrypt.hashSync(password, 10)
    const newManager = new Manager({
        fullName,
        address,
        contact,
        gender,
        district,
        city,
        pincode,
        email,
        profilePic: req.file?.filename && req.file.filename,
        password: hashPassword
    })
    await newManager.save()
    res.send({
        message: "Manager Registered Successfully", newManager
    })
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    const manager = await Manager.findOne({ email })
    if (!manager) {
        res.status(404).send({
            message: "Invalid Email"
        })
    }
    else {
        if (!manager.Activated) {
            return res.status(404).send({ message: "Manager is not Activated" })
        }
        const iscorrectPassword = bcrypt.compareSync(password, manager.password)
        if (iscorrectPassword) {
            const token = jwt.sign({ id: manager._id }, process.env.JWT_TOKEN)
            res.send({
                message: "Manager logged in successfully", manager, token
            })
        }
        else {
            res.status(404).send({
                message: "Incorrect Password"
            })
        }
    }
})

router.get("/profile", async (req, res) => {
    const token = req.headers.authorization.slice(7)
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    const manager = await Manager.findOne({ "_id": decoded.id })
    res.send({
        message: "Manager Profile", manager
    })
})

router.put("/updateprofile", upload.single("profilePic"), async (req, res) => {
    try {
        const token = req.headers.authorization.slice(7)
        const decoded = jwt.verify(token, process.env.JWT_TOKEN)
        const { fullName, address, contact, gender, district, city, pincode, email } = req.body
        await Manager.findByIdAndUpdate(decoded.id, {
            fullName,
            address,
            contact,
            gender,
            district,
            city,
            pincode,
            email,
            profilePic: req.file && req.file?.filename
        })
        res.send({
            message: "Updated Successfully"
        })
    }
    catch (e) {
        res.status(403).send({
            message: "Not Authorised"
        })
    }
})

router.get("/viewgardener", async (req, res) => {
    const token = req.headers.authorization.slice(7)
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    const gardener = await Gardener.find()
    res.send({
        message: "Registered Gardeners", gardener
    })
})

router.get("/viewchat/:id", async (req, res) => {
    const token = req.headers.authorization.slice(7)
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    if (req.params.id == "undefined") {
        res.send({ message: "Message sent", chat: [] })
        return
    }
    const chat = await Chat.find({ $or: [{ recieverId: decoded.id, senderId: req.params.id }, { recieverId: req.params.id, senderId: decoded.id }] })
    res.send({ message: "Message sent", chat })
})

module.exports = router