const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');

router.post('/save', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  res.status(201).json({});
});

router.post('/login', async (req, res) => {
  const { mail, password } = req.body;
  try {
    const user = await User.findOne({ mail });
    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Mot de passe ou utilisateur incorrect' });
    }
    const token = jwt.sign({ userId: user._id }, 'votre_secret_key', { expiresIn: '1h' });
    res.json({ token, user: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/findUserByRole/:role', async (req, res) => {
  const role = decodeURIComponent(req.params.role);
  try {
    const mechanics = await User.find({ role: role });
    if (!mechanics || mechanics.length === 0) {
      return res.status(404).json({ message: `Aucun ${role} trouvé.` });
    }
    res.status(200).json(mechanics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
