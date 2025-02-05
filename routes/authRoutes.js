// backend/routes/authRoutes.js
const express = require('express');
const { register, login, getProfile, deleteAccount } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router();

router.post('/register', register); // Ruta para registrar un usuario
router.post('/login', login); // Ruta para iniciar sesión
router.get('/profile', authMiddleware, getProfile); // Ruta para obtener el perfil del usuario
router.delete('/delete', authMiddleware, deleteAccount); // Ruta para eliminar la cuenta del usuario

module.exports = router;