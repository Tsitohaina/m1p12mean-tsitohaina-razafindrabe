const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

router.post('/save', async (req, res) => {
    try {
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
        const appointments = await Appointment.find({ user: userId }).populate('mechanic', 'name mail mobil');
        if (appointments.length === 0) {
            return res.status(404).json({ message: "Aucun rendez-vous trouvé." });
        }
        res.status(200).json(appointments);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/findByStatus/:status', async (req, res) => {
    const status = req.params.status;
    try {
        const appointments = await Appointment.find({ status: status }).populate('mechanic', 'name mail mobil').populate('user', 'name mail mobil');
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

router.put('/updateStatus/:appointmentId', async (req, res) => {
    const appointmentId = req.params.appointmentId;
    const { status } = req.body;
    try {
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: 'Rendez-vous non trouvé.' });
        }
        appointment.status = status;
        await appointment.save();
        res.status(200).json(appointment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du statut.' });
    }
});

router.put('/updateMechanic/:appointmentId', async (req, res) => {
    const appointmentId = req.params.appointmentId;
    const { mechanic } = req.body;
    try {
        console.log('0');
        console.log(mechanic);
        console.log('1');
        const appointment = await Appointment.findById(appointmentId);
        console.log(appointment);
        if (!appointment) {
            return res.status(404).json({ message: 'Rendez-vous non trouvé.' });
        }
        appointment.mechanic = mechanic;
        console.log(appointment);
        await appointment.save();
        res.status(200).json(appointment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du statut.' });
    }
});

module.exports = router;