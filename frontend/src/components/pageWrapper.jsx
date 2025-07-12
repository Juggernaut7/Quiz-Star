// src/components/PageWrapper.jsx
import React from 'react';
import { motion } from 'framer-motion';

const variants = {
  hidden:   { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -20 },
};

export default function PageWrapper({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gray-100 dark:bg-gray-900"
    >
      {children}
    </motion.div>
  );
}
