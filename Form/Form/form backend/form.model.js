const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    reName: {
        type: String,
        required: true
    },
    reNo: {
        type: String,
        required: true
    },
    filePath: {
        type: String
    },
    fileName: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Form', formSchema);