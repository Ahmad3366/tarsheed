const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    reporterName: {
        type: String,
        required: true,
        trim: true
    },
    reporterPhone: {
        type: Number,
        required: true,
        trim: true
    },
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
    },
		status: {
			type: String,
			required: true,
			default: 'in_progress',
			enum: ['in_progress', 'resolved', 'rejected']
		}
}, {timestamps: true});

module.exports = mongoose.model('Report', ReportSchema);