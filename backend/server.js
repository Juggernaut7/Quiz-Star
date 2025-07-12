const express = require('express');
const dotenv = require('dotenv');
// const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Middlewares
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173',
   'https://quiz-star-mv68.vercel.app',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Auth routes
app.use('/api/auth', require('./routes/authRoutes'));

// Public Quiz route
app.use('/api/quiz', require('./routes/quizRoutes'));

// Protected Score route
const authMiddleware = require('./middleware/authMiddleware');
app.use('/api/score', authMiddleware, require('./routes/scoreRoutes'));

// Basic health check
app.get('/', (req, res) => {
  res.send('QuizStar API Running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
