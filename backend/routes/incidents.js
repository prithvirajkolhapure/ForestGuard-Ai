const express = require('express');
const router = express.Router();
const Incident = require('../models/Incident');

// Get all incidents
router.get('/', async (req, res) => {
    try {
        const incidents = await Incident.find().sort({ timestamp: -1 });
        res.json(incidents);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create incident (often called by AI server)
router.post('/', async (req, res) => {
    try {
        const newIncident = new Incident(req.body);
        const incident = await newIncident.save();

        // Emit real-time alert via Socket.IO
        const io = req.app.get('io');
        io.emit('new_incident', incident);

        res.json(incident);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update incident status
router.patch('/:id', async (req, res) => {
    try {
        const incident = await Incident.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(incident);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
