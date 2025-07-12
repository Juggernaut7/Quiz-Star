const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: true, // Reflect request origin
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/quiz', require('./routes/quizRoutes'));

// Protected route
const authMiddleware = require('./middleware/authMiddleware');
app.use('/api/score', authMiddleware, require('./routes/scoreRoutes'));

// Health check
app.get('/', (req, res) => {
  res.send('QuizStar API Running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
