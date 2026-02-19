const mongoose = require("mongoose")
const eventSchema = mongoose.Schema({
    managerId: { type: mongoose.Schema.ObjectId, required: true, ref: "manager" },
    eventName: { type: String, required: true },
    eventCategory: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    eventDate: { type: String, required: true },
    eventTime: { type: String, required: true },
    image: { type: String, required: true }
})

const Event = mongoose.model("event", eventSchema)

module.exports = Event