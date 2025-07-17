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

const faqs = [
  {
    question: 'How does QuizVerse work?',
    answer: 'Select a category, start the quiz, and answer the questions. You’ll get instant feedback and your score at the end!',
  },
  {
    question: 'Is QuizVerse free to use?',
    answer: 'Absolutely! QuizVerse is 100% free and always will be.',
  },
  {
    question: 'Do I need to create an account?',
    answer: 'Sign-up is required to play. Sign up and get started immediately!',
  },
];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    if (selectedCategory) {
      navigate(`/quiz/${selectedCategory.id}`);
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 lg:p-8"> {/* Adjusted overall padding */}
      <AnimatePresence mode="wait">
        {!selectedCategory ? (
          <motion.div
            key="categories"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="max-w-6xl mx-auto"
          >
            {/* Hero Section */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 mb-16">
              <div className="flex-1 text-center lg:text-left">
                <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gray-800 dark:text-white leading-tight" // Added md:text-6xl
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Welcome to QuizVerse
                </motion.h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 px-2 sm:px-0"> {/* Adjusted text size and added horizontal padding for small screens */}
                  Sharpen your mind, challenge your knowledge. Pick a category to begin!
                </p>
              </div>
              <div className="flex-1 flex justify-center lg:justify-start"> {/* Centered image on small screens */}
                <img
                  src="https://cdn-icons-png.flaticon.com/512/6251/6251119.png"
                  alt="Quiz Illustration"
                  className="w-full max-w-xs sm:max-w-sm mx-auto object-contain" // Adjusted max-width for better scaling
                />
              </div>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"> {/* Changed md to lg for 3 columns */}
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
            className="max-w-xl mx-auto text-center mt-12 sm:mt-24" // Adjusted margin-top for smaller screens
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6"> {/* Responsive font size */}
              Ready for the <span className="text-purple-600">{selectedCategory.label}</span> Quiz?
            </h2>

            <div className="flex flex-col items-center gap-4">
              <button
                onClick={handleStartQuiz}
                className="w-full sm:w-64 px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:opacity-90 transition text-lg" // Full width on small, fixed on sm+
              >
                Start Quiz
              </button>
              <button
                onClick={() => setSelectedCategory(null)}
                className="w-full sm:w-64 px-4 py-2 border border-gray-400 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-lg" // Full width on small, fixed on sm+
              >
                🔁 Pick Another
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* How It Works */}
      <section className="max-w-4xl mx-auto text-center mt-16 sm:mt-24 mb-16 sm:mb-24 px-4"> {/* Adjusted margins and added padding */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">📘 How It Works</h2> {/* Responsive font size */}
        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-6">
          QuizVerse is simple and fun! Just pick a category, test your knowledge, and see how well you do.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left"> {/* Added sm:gap-8 */}
          {[
            {
              title: '1. Choose a Topic',
              desc: 'Select from categories like Computer Science, Science, or General Knowledge.',
            },
            {
              title: '2. Take the Quiz',
              desc: 'Answer multiple-choice questions within a limited time for each category.',
            },
            {
              title: '3. View Results',
              desc: 'Get instant feedback and see how you rank. Improve and try again anytime!',
            },
          ].map((step, idx) => (
            <motion.div
              key={idx}
              className="p-4 sm:p-6 rounded-lg bg-white dark:bg-gray-800 shadow" // Adjusted padding
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
            >
              <h4 className="text-lg sm:text-xl font-semibold mb-2 text-purple-600">{step.title}</h4> {/* Responsive font size */}
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{step.desc}</p> {/* Responsive font size */}
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto mt-16 sm:mt-24 mb-16 sm:mb-24 px-4"> {/* Adjusted margins and added padding */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white text-center mb-6">Frequently Asked Questions</h2> {/* Responsive font size */}
        {faqs.map((faq, idx) => (
          <motion.div
            key={idx}
            className="mb-4 p-4 sm:p-6 rounded-lg bg-white dark:bg-gray-800 shadow" // Adjusted padding
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <h4 className="font-semibold text-base sm:text-lg text-purple-700">{faq.question}</h4> {/* Responsive font size */}
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-1">{faq.answer}</p> {/* Responsive font size */}
          </motion.div>
        ))}
      </section>

      {/* Newsletter Section */}
      <section className="max-w-xl mx-auto mt-12 sm:mt-16 mb-16 sm:mb-24 text-center px-4"> {/* Adjusted margins and added padding */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4">📬 Sign Up for Our Newsletter</h2> {/* Responsive font size */}
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6">Stay updated with the latest quizzes, tips, and updates from QuizVerse!</p>
        <div className="w-full max-w-sm mx-auto mb-6"> {/* Adjusted max-width for illustration */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/9331/9331136.png"
            alt="Newsletter Illustration"
            className="w-full object-contain"
          />
        </div>
        {subscribed ? (
          <p className="text-green-600 dark:text-green-400 text-lg">Thanks for subscribing! 🎉</p> // Responsive text size
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-4 max-w-md mx-auto"> {/* Added max-w-md to form */}
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full sm:flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 text-base" // Full width on small, grows on sm+
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition text-base" // Full width on small, auto on sm+
            >
              Subscribe
            </button>
          </form>
        )}
      </section>

      {/* Footer */}
      <footer className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-6 pb-4 mt-12 sm:mt-20"> {/* Responsive text size and margin */}
        <p>© {new Date().getFullYear()} QuizVerse. Made with React by Juggernaut.</p>
      </footer>
    </div>
  );
};

export default Home;