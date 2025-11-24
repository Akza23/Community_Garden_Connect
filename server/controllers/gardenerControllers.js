const express = require("express")
const router = express.Router()
const upload = require("../services/imageservices")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Gardener = require("../models/gardenerSchema")

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

module.exports = router