const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

// @route   POST /api/score
// @desc    Submit a new quiz score
// @access  Private (authMiddleware already applied in server.js)
router.post('/', async (req, res) => {
  try {
    const { score, category } = req.body;
    const userId = req.user._id;

    const newScore = await Score.create({ user: userId, category, score });

    res.status(201).json({
      message: 'Score submitted successfully',
      newScore,
    });
  } catch (err) {
    console.error('Error saving score:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/score
// @desc    Get user quiz stats and history
// @access  Private
router.get('/', async (req, res) => {
  try {
    const userId = req.user._id;

    const scores = await Score.find({ user: userId }).sort({ createdAt: -1 });

    if (scores.length === 0) {
      return res.json({
        stats: {
          quizzesTaken: 0,
          highestScore: '0/10',
          averageScore: '0/10',
        },
        history: [],
      });
    }

    const highest = Math.max(...scores.map(s => s.score));
    const average = (scores.reduce((acc, s) => acc + s.score, 0) / scores.length).toFixed(1);

    const history = scores.map(s => ({
      date: s.createdAt,
      category: s.category,
      score: s.score,
    }));

    res.json({
      stats: {
        quizzesTaken: scores.length,
        highestScore: `${highest}/10`,
        averageScore: `${average}/10`,
      },
      history,
    });
  } catch (err) {
    console.error('Error fetching scores:', err);
    res.status(500).json({ message: 'Failed to fetch user scores' });
  }
});

module.exports = router;
