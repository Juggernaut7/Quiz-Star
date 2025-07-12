import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
console.log('🔍 Quiz API BASE_URL:', BASE_URL);

export const fetchQuiz = async (amount = 10, category, difficulty) => {
  const params = { amount };
  if (category) params.category = category;
  if (difficulty) params.difficulty = difficulty;

  const response = await axios.get(`${BASE_URL}/api/quiz`, { params });
  return response.data;
};
