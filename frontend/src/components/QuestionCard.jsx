import React from 'react';
import { motion } from 'framer-motion';

export default function QuestionCard({
  data,
  index,
  total,
  timeLeft,
  selected,
  onAnswer,
}) {
  const { question, options, correct_answer } = data;

  const getButtonStyle = (opt) => {
    if (!selected) return 'bg-blue-100 dark:bg-gray-700 hover:bg-blue-200';
    if (opt === selected && opt === correct_answer) return 'bg-green-300 dark:bg-green-700';
    if (opt === selected && opt !== correct_answer) return 'bg-red-300 dark:bg-red-700';
    return 'bg-gray-100 dark:bg-gray-600';
  };

  return (
    <motion.div
      className="p-6 bg-white dark:bg-gray-800 rounded shadow"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <div className="flex justify-between mb-4">
        <h2 className="text-sm">Question {index + 1} of {total}</h2>
        <span className="text-sm">{timeLeft}s</span>
      </div>
      
      <p className="font-medium mb-4" dangerouslySetInnerHTML={{ __html: question }} />

      <div className="grid gap-2">
        {options.map((opt, i) => (
          <motion.button
            key={i}
            className={`p-2 rounded transition-all text-left ${getButtonStyle(opt)}`}
            whileHover={{ scale: !selected ? 1.02 : 1 }}
            onClick={() => onAnswer(opt)}
            disabled={!!selected}
            dangerouslySetInnerHTML={{ __html: opt }}
          />
        ))}
      </div>
    </motion.div>
  );
}
