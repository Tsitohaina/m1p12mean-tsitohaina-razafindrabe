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
        const appointments = await Appointment.find({ user: userId });
        if (appointments.length === 0) {
            return res.status(404).json({ message: "Aucun rendez-vous trouvé." });
        }
        res.status(200).json(appointments);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/findByMechanicId/:mechanicId', async (req, res) => {
    const mechanicId = req.params.mechanicId;
    try {
        const appointments = await Appointment.find({ mechanic: mechanicId }).populate('user', 'name mail mobil');

        if (appointments.length === 0) {
            return res.status(404).json({ message: "Aucun rendez-vous trouvé pour ce mécanicien." });
        }

        res.status(200).json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur lors de la récupération des rendez-vous." });
    }
});

module.exports = router;