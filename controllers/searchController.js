// backend/controllers/searchController.js
const SearchHistory = require('../models/SearchHistory');

const saveSearch = async (req, res) => {
  const { searchTerm } = req.body;
  const userId = req.userId;
  try {
    const search = new SearchHistory({ userId, searchTerm });
    await search.save();
    res.status(201).json({ message: 'Search saved successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSearchHistory = async (req, res) => {
  const userId = req.userId;
  try {
    const history = await SearchHistory.find({ userId }).sort({ timestamp: -1 });
    res.json(history);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { saveSearch, getSearchHistory };