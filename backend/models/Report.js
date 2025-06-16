const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    imageFile: {
        type: String, // base64 string or image URL
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Report', ReportSchema);