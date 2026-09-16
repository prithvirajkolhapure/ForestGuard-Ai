const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
    sensorId: { type: String, required: true, unique: true },
    type: {
        type: String,
        enum: ['Acoustic', 'Vibration', 'Motion', 'Camera'],
        required: true
    },
    location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    status: {
        type: String,
        enum: ['Active', 'Maintenance', 'Inactive'],
        default: 'Active'
    },
    lastPing: { type: Date, default: Date.now },
    batteryLevel: { type: Number, min: 0, max: 100 }
});

module.exports = mongoose.model('Sensor', sensorSchema);
