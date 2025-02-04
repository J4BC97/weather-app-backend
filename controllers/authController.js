// backend/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save(); // Guarda el usuario en la base de datos
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }); // Busca al usuario en la base de datos
    if (!user) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }
    const isMatch = await user.comparePassword(password); // Compara la contraseña
    if (!isMatch) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Genera un token JWT
    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { register, login };