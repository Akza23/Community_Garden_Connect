const mongoose = require("mongoose")
const chatSchema = mongoose.Schema({
    message: { type: String, required: true },
    recieverId: { type: String, required: true },
    senderId: { type: String, required: true }
}, { timestamps: true })

const Chat = mongoose.model("chat", chatSchema)

module.exports = Chat