const mongoose = require("mongoose")
const registerSchema = mongoose.Schema({
    eventId: { type: mongoose.Schema.ObjectId, required: true, ref: "event" },
    gardenerId: { type: mongoose.Schema.ObjectId, required: true, ref: "gardener" }
}, { timestamps: true })

const Register = mongoose.model("register", registerSchema)

module.exports = Register