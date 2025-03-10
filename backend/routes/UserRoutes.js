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

router.post('/login', async (req, res) => {
  const { email, password } = req.body; 
  try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Utilisateur non trouvé' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Mot de passe ou utilisateur incorrect' });
      }
      const token = jwt.sign({ userId: user._id }, 'votre_secret_key', { expiresIn: '1h' });
      res.json({ token, user: { id: user._id, name: user.name, mail: user.mail } });
  }catch (error) {
      res.status(500).json({ message: error.message });
  }
});