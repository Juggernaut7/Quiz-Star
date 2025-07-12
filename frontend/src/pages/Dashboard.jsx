import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);

 const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/score`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        'Cache-Control': 'no-cache',
      });

      const data = await res.json();

      if (!data || !data.stats || !Array.isArray(data.history)) {
        throw new Error('Invalid response structure');
      }

      const { quizzesTaken, highestScore, averageScore } = data.stats;

      setStats([
        { title: 'Quizzes Taken', value: quizzesTaken },
        { title: 'Highest Score', value: highestScore },
        { title: 'Average Score', value: averageScore },
      ]);

      setHistory(data.history);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  
  if (loading) return <div className="p-6 text-center">Loading your dashboard...</div>;

  return (
    <div className="p-6">
      <motion.h1 className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        Welcome, {user?.username || 'Player'}!
      </motion.h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div key={i}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.4 }}>
            <p className="text-sm text-gray-500 dark:text-gray-400">{s.title}</p>
            <p className="mt-2 text-xl font-semibold">{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* History List */}
      <motion.div initial="hidden" animate="visible" variants={{
        hidden: {}, visible: { transition: { staggerChildren: 0.1 } }
      }}>
        <h2 className="text-2xl font-semibold mb-4">Quiz History</h2>
        {history.length === 0 ? (
          <p className="text-gray-500">No quizzes taken yet. Go take one now!</p>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            {history.map((h, i) => (
              <motion.div key={i}
                className="flex justify-between px-6 py-4 border-b last:border-none"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}>
                <span>{new Date(h.date).toLocaleDateString()}</span>
                <span>{h.category}</span>
                <span>{h.score}/10</span>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
