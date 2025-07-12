// src/components/HomeCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

const HomeCard = ({ category, IconComponent, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      layout
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="cursor-pointer bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-xl shadow-md flex flex-col items-center justify-center transition duration-300 ease-in-out hover:shadow-xl"
    >
      <IconComponent className="text-3xl text-purple-600 dark:text-purple-400 mb-2" />
      <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">{category}</span>
    </motion.div>
  );
};

export default HomeCard;
