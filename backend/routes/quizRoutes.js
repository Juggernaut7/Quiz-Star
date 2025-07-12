const express = require('express');
const axios = require('axios');
const router = express.Router();

// @route   GET /api/quiz
// @desc    Fetch quiz questions from OpenTDB
// @access  Public
router.get('/', async (req, res) => {
  const { amount = 10, category, difficulty } = req.query;

  const url = `https://opentdb.com/api.php?amount=${amount}${category ? `&category=${category}` : ''}&type=multiple${difficulty ? `&difficulty=${difficulty}` : ''}`;

  try {
    const response = await axios.get(url);
    const results = response.data.results;

    // Optional: shuffle options and format response
    const formatted = results.map(q => {
      const answers = [...q.incorrect_answers, q.correct_answer]
        .sort(() => 0.5 - Math.random());

      return {
        question: q.question,
        correct_answer: q.correct_answer,
        options: answers,
        category: q.category,
        difficulty: q.difficulty,
      };
    });

    res.json(formatted);
  } catch (error) {
    console.error('Quiz fetch error:', error.message);
    res.status(500).json({ error: 'Failed to fetch quiz questions' });
  }
});

module.exports = router;
