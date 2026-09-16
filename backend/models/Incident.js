const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        region: { type: String }
    },
    type: {
        type: String,
        enum: ['Tree Cutting', 'Chainsaw Sound', 'Unauthorized Human', 'Logging Truck', 'Sensor Anomaly'],
        required: true
    },
    severity: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Critical'],
        default: 'Medium'
    },
    status: {
        type: String,
        enum: ['Pending', 'Investigating', 'Resolved', 'False Alarm'],
        default: 'Pending'
    },
    detectedBy: { type: String, enum: ['AI', 'Manual', 'Sensor'], default: 'AI' },
    imageUrl: { type: String },
    audioUrl: { type: String },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Incident', incidentSchema);
