import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  }

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

  if (loading) return <div className="p-6 text-center text-lg text-gray-700 dark:text-gray-300">Loading your dashboard...</div>; // Responsive text size

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"> {/* Added padding and background */}
      <motion.h1 
        className="text-3xl sm:text-4xl font-bold mb-6" // Responsive font size
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
      >
        Welcome, {user?.username || 'Player'}!
      </motion.h1>

      {/* Home Button */}
      <button
        onClick={handleClick}
        className="mb-6 px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-base sm:text-lg" // Responsive padding and text size
      >
        Go Home
      </button>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"> {/* Adjusted grid for better responsiveness */}
        {stats.map((s, i) => (
          <motion.div key={i}
            className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg" // Responsive padding
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.4 }}>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">{s.title}</p> {/* Responsive text size */}
            <p className="mt-2 text-xl sm:text-2xl font-semibold">{s.value}</p> {/* Responsive text size */}
          </motion.div>
        ))}
      </div>

      {/* History List */}
      <motion.div initial="hidden" animate="visible" variants={{
        hidden: {}, visible: { transition: { staggerChildren: 0.1 } }
      }}>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Quiz History</h2> {/* Responsive font size */}
        {history.length === 0 ? (
          <p className="text-gray-500 text-base sm:text-lg">No quizzes taken yet. Go take one now!</p> // Responsive text size
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            {history.map((h, i) => (
              <motion.div key={i}
                className="flex flex-col sm:flex-row justify-between px-4 py-3 sm:px-6 sm:py-4 border-b last:border-none text-sm sm:text-base" // Responsive layout and padding
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}>
                <span className="mb-1 sm:mb-0">{new Date(h.date).toLocaleDateString()}</span>
                <span className="mb-1 sm:mb-0">{h.category}</span>
                <span>{h.score}/10</span>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}