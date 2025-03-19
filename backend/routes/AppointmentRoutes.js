const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

router.post('/save', async (req, res) => {
    try {
        console.log("test save Appointment");
        console.log(req.body);
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).json(appointment);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});
router.get('/findByUserId/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const appointments = await Appointment.findOne({ user: userId });
        if (!appointments || appointments.length === 0) {
            return res.status(404).json({ message: "Aucun rendez-vous trouvé." });
        }
        res.status(200).json(appointments);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;