const mongoose = require("mongoose")
const managerSchema = mongoose.Schema({
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    gender: { type: String, required: true },
    district: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePic: { type: String },
    password: { type: String, required: true },
    Activated: { type: Boolean }
})

const Manager = mongoose.model("manager", managerSchema)

module.exports = Manager