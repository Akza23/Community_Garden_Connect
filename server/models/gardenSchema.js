const mongoose = require("mongoose")
const gardenSchema = mongoose.Schema({
    managerId: { type: String, required: true },
    plotName: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    gardenType: { type: String, required: true },
    image: { type: String, required: true }
})

const Garden = mongoose.model("garden", gardenSchema)

module.exports = Garden