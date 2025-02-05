// backend/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  const { username, email, password } = req.body; // Añadir email
  try {
    const user = new User({ username, email, password });
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
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } }); // Añadir email a la respuesta
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// Función para obtener el perfil del usuario
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ username: user.username, email: user.email });
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Función para eliminar la cuenta del usuario
const deleteAccount = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ message: 'Cuenta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

module.exports = { register, login, deleteAccount, getProfile };