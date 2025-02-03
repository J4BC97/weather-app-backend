// backend/routes/searchRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { saveSearch, getSearchHistory } = require('../controllers/searchController');
const router = express.Router();

router.post('/search', authMiddleware, saveSearch);
router.get('/history', authMiddleware, getSearchHistory);

module.exports = router;