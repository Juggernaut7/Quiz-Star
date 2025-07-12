// src/pages/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeCard from '../components/HomeCard';
import { FaFlask, FaCode, FaBrain } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  { id: 18, label: 'Computer Science', icon: FaCode },
  { id: 17, label: 'Science', icon: FaFlask },
  { id: 9, label: 'General Knowledge', icon: FaBrain },
];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    if (selectedCategory) {
      navigate(`/quiz/${selectedCategory.id}`);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <AnimatePresence mode="wait">
        {!selectedCategory ? (
          <motion.div
            key="categories"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-center">Choose a Quiz Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {categories.map((cat) => (
                <HomeCard
                  key={cat.id}
                  category={cat.label}
                  IconComponent={cat.icon}
                  onClick={() => setSelectedCategory(cat)}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-6">
              Ready for {selectedCategory.label} Quiz?
            </h2>
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={handleStartQuiz}
                className="w-48 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Start Quiz
              </button>
              <button
                onClick={() => setSelectedCategory(null)}
                className="w-48 px-4 py-2 border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                Pick Another Category
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
