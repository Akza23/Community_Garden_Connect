const express = require("express")
const router = express.Router()
const upload = require("../services/imageservices")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Gardener = require("../models/gardenerSchema")
const Garden = require("../models/gardenSchema")
const transport = require("../services/emailservices")
const { randomBytes } = require("node:crypto")
const Task = require("../models/taskSchema")
const Manager = require("../models/managerSchema")
const Event = require("../models/eventSchema")
const { register } = require("node:module")
const Register = require("../models/eventregisterSchema")

router.post("/register", upload.single("profilePic"), async (req, res) => {
    const { fullName, address, dob, gender, mobileNo, district, city, skills, email, password } = req.body
    const hashPassword = bcrypt.hashSync(password, 10)
    const newGardener = new Gardener({
        fullName,
        address,
        dob,
        gender,
        mobileNo,
        district,
        city,
        skills,
        email,
        password: hashPassword,
        profilePic: req.file?.filename && req.file.filename
    })
    await newGardener.save()
    res.send({
        message: "Gardener registered successfully", newGardener
    })
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    const gardener = await Gardener.findOne({ email })
    if (!gardener) {
        res.status(400).send({
            message: "Invalid Email or Password"
        })
    }
    else {
        const iscorrectPassword = bcrypt.compareSync(password, gardener.password)
        if (iscorrectPassword) {
            const token = jwt.sign({ id: gardener._id }, process.env.JWT_TOKEN)
            res.send({
                message: "Gardener Registered Successfully", gardener, token
            })
        }
        else {
            res.status(400).send({
                message: "Incorrect Password"
            })
        }
    }
})

router.get("/profile", async (req, res) => {
    const token = req.headers.authorization.slice(7)
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    const gardener = await Gardener.findOne({ "_id": decoded.id })
    res.send({ message: "Gardener Profile", gardener })
})

router.put("/updateprofile", upload.single("profilePic"), async (req, res) => {
    try {
        const token = req.headers.authorization.slice(7)
        const decoded = jwt.verify(token, process.env.JWT_TOKEN)
        const { fullName, address, dob, gender, mobileNo, district, city, skills, email } = req.body
        await Gardener.findByIdAndUpdate(decoded.id, {
            fullName,
            address,
            dob,
            gender,
            mobileNo,
            district,
            city,
            skills,
            email,
            profilePic: req.file && req.file?.filename
        })
        res.send({ message: "Updated Successfully" })
    }
    catch (e) {
        res.status(403).send({ message: "Not Authorised" })
    }
})

router.post("/forgotpassword", async (req, res) => {
    const emailId = req.body.email
    const gardener = await Gardener.findOne({ email: emailId })
    if (!gardener) {
        res.status(400).send({
            message: "No such user"
        })
    }
    else {
        const token = Buffer.from(randomBytes(56)).toString('hex');
        gardener.token = token
        await gardener.save()
        await transport.sendMail({
            from: `"gardener admin"<${process.env.GMAIL_ADDRESS}>`,
            to: gardener.email,
            subject: "Password reset email",
            html: `Here is your password reset link:<a href="http://localhost:5173/gardenerresetpass?token=${token}">link</a>`
        })
        res.send({
            message: "Email Sent"
        })
    }
})

router.post("/resetpassword", async (req, res) => {
    const { password, token } = req.body
    const gardener = await Gardener.findOne({ token })
    if (gardener) {
        const hashPassword = bcrypt.hashSync(password, 10)
        gardener.password = hashPassword
        gardener.token = null
        await gardener.save()
        res.send("Password Reset")
    }
    else {
        res.status(400).send("Gardener not found")
    }
})

router.get("/viewtask", async (req, res) => {
    try {
        const token = req.headers.authorization.slice(7)
        const decoded = jwt.verify(token, process.env.JWT_TOKEN)
        const task = await Task.find({ "assignGardener": decoded.id }).populate("selectGarden")
        // console.log("DECODED TOKEN =", decoded);
        res.send({ message: "Task view", task })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetching tasks", error });
    }
})

router.get("/viewgarden", async (req, res) => {
    const token = req.headers.authorization.slice(7)
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    const garden = await Task.find({ "assignGardener": decoded.id }).populate("selectGarden").select("selectGarden").lean()
    let val = garden.map((item) => item.selectGarden)
    // console.log("DECODED TOKEN=", decoded)
    res.send({
        message: "Garden View", garden: val
    })
})

router.get("/viewmanager", async (req, res) => {
    const token = req.headers.authorization.slice(7)
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    const data = await Task.find({ "assignGardener": decoded.id }).populate("managerId").select("fullName").lean()
    let dupch = new Set()
    const chat = data.map((item) => item.managerId).filter((item) => {
        if (!dupch.has(item.fullName)) {
            dupch.add(item.fullName)
            return true
        }
        return false
    })
    res.send({
        message: "Manager View", chat
    })
})

router.get("/viewchat/:id", async (req, res) => {
    const token = req.headers.authorization.slice(7)
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    if (req.params.id == "undefined") {
        res.send({ message: "Message sent", chat: [] })
        return
    }
    const chat = await Chat.find({ $or: [{ "recieverId": decoded.id, "senderId": req.params.id }, { "recieverId": req.params.id, "senderId": decoded.id }] })
    res.send({ message: "Message sent", chat })
})

router.get("/viewevent", async (req, res) => {
    const token = req.headers.authorization.slice(7)
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    const event = await Event.find().lean()
    const data = await Promise.all(event.map(async item => {
        const register = await Register.findOne({ eventId: item._id })
        if (register) {
            return { ...item, registered: true }
        }
        return { ...item, registered: false }
    }))
    res.send({ message: "Event view", event: data })
})

router.post("/registerevent", async (req, res) => {
    const { eventId } = req.body
    const token = req.headers.authorization.slice(7)
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    const newRegister = new Register({
        eventId,
        gardenerId: decoded.id
    })
    await newRegister.save()
    res.send({ message: "Registered", newRegister })
})

module.exports = router