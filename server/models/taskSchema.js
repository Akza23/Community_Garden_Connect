const mongoose = require("mongoose")
const taskSchema = mongoose.Schema({
    managerId: { type: mongoose.Schema.ObjectId, required: true, ref: "manager" },
    taskCategory: { type: String, required: true },
    description: { type: String, required: true },
    selectGarden: { type: mongoose.Schema.ObjectId, required: true, ref: "garden" },
    assignGardener: { type: mongoose.Schema.ObjectId, required: true, ref: "gardener" },
    startDate: { type: String, required: true },
    dueDate: { type: String, required: true },
    status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" }
})

const Task = mongoose.model("task", taskSchema)

module.exports = Task