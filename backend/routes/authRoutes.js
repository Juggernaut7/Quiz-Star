const express = require('express');
const router = express.Router();
const { register, login, logout, me } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
// routes/authRoutes.js
router.get('/me', me);


module.exports = router;
