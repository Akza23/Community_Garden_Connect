const mongoose = require("mongoose")
const gardenerSchema = mongoose.Schema({
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    mobileNo: { type: String, required: true },
    district: { type: String, required: true },
    city: { type: String, required: true },
    skills: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String }
})

const Gardener = mongoose.model("gardener", gardenerSchema)

module.exports = Gardener;