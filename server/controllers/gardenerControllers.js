const express = require("express")
const router = express.Router()
const upload = require("../services/imageservices")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Gardener = require("../models/gardenerSchema")

router.post("/register", upload.single("profilePic"), async (req, res) => {
    const { fullName, address, age, gender, mobileNo, district, city, skills, email, password } = req.body
    const hashPassword = bcrypt.hashSync(password, 10)
    const newGardener = new Gardener({
        fullName,
        address,
        age,
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

module.exports = router