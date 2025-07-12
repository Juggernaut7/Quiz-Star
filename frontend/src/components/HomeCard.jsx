// src/components/HomeCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

const HomeCard = ({ category, IconComponent, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      layout
      whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(0,0,0,0.2)' }}
      whileTap={{ scale: 0.95 }}
      className="cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-lg flex flex-col items-center justify-center transition duration-300 ease-in-out"
    >
      {IconComponent && (
        <IconComponent className="w-12 h-12 text-blue-500 dark:text-blue-300" />
      )}
      <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-gray-100 text-center">
        {category}
      </h3>
    </motion.div>
  );
};

export default HomeCard;
