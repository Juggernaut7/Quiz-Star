import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ResultCard({ score, total }) {
  const navigate = useNavigate();
  const percentage = Math.round((score / total) * 100);

  const remark =
    percentage === 100
      ? 'Perfect Score! 🎯'
      : percentage >= 80
      ? 'Excellent Job! 🙌'
      : percentage >= 50
      ? 'Nice Try! 👍'
      : 'Keep Practicing! 💪';

  const handleRetry = () => {
    const category = localStorage.getItem('selectedCategory');
    if (category) {
      navigate(`/quiz?category=${category}`);
    } else {
      // Fallback if no category is found
      navigate('/');
    }
  };

  return (
    <motion.div
      className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
      <p className="text-lg font-medium mb-2">
        You scored <span className="text-blue-500">{score}</span> out of <span className="text-blue-500">{total}</span>
      </p>
      <p className="text-md mb-6">{remark}</p>

      <div className="flex justify-center gap-4">
        <button
          onClick={handleRetry}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Try Again
        </button>
        <button
          onClick={() => navigate('/')}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Go Home
        </button>
      </div>
    </motion.div>
  );
}
