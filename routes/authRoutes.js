// backend/routes/authRoutes.js
const express = require('express');
const { register, login, getProfile, deleteAccount } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);
router.delete('/delete', authMiddleware, deleteAccount);

module.exports = router;