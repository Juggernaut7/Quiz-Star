// src/components/layout/Navbar.jsx
import React, { useContext, useState } from 'react'; // Import useState
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import hamburger and close icons
import { AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/dashboard', label: 'Dashboard' },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false); // Close mobile menu when a link is clicked
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false); // Close mobile menu on logout
  };

  return (
    <motion.nav
      className="bg-white dark:bg-gray-800 shadow-md px-4 sm:px-6 py-4 flex justify-between items-center relative z-50" // Added sm:px-6 and relative positioning
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Link to="/" className="text-xl sm:text-2xl font-bold text-blue-600">QuizStar</Link> {/* Responsive font size */}

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-4"> {/* Hidden on small, flex on md+ */}
        {navLinks.map((ln) => (
          <NavLink
            key={ln.to}
            to={ln.to}
            className={({ isActive }) =>
              `px-3 py-1 rounded transition-colors text-base ${ // Adjusted text size
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`
            }
          >
            {ln.label}
          </NavLink>
        ))}

        {!user ? (
          <>
            <NavLink
              to="/login"
              className="px-3 py-1 rounded transition-colors text-base text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700" // Adjusted text size
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="px-3 py-1 bg-blue-600 text-white rounded transition-colors hover:bg-blue-700 text-base" // Adjusted text size
            >
              Register
            </NavLink>
          </>
        ) : (
          <>
            <span className="text-gray-700 dark:text-gray-200 text-base">Hi, {user.username}</span> {/* Adjusted text size */}
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 text-white rounded transition-colors hover:bg-red-600 text-base" // Adjusted text size
            >
              Logout
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu Button (Hamburger/Close Icon) */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <FaTimes className="w-6 h-6" /> // Close icon
          ) : (
            <FaBars className="w-6 h-6" /> // Hamburger icon
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay/Dropdown */}
      <AnimatePresence> {/* Added AnimatePresence for exit animations */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-lg py-4 border-t border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <nav className="flex flex-col items-center space-y-4">
              {navLinks.map((ln) => (
                <NavLink
                  key={ln.to}
                  to={ln.to}
                  onClick={handleLinkClick} // Close menu on click
                  className={({ isActive }) =>
                    `w-full text-center px-4 py-2 rounded transition-colors text-lg ${ // Full width, larger text
                      isActive
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`
                  }
                >
                  {ln.label}
                </NavLink>
              ))}

              {!user ? (
                <>
                  <NavLink
                    to="/login"
                    onClick={handleLinkClick} // Close menu on click
                    className="w-full text-center px-4 py-2 rounded transition-colors text-lg text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700" // Full width, larger text
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={handleLinkClick} // Close menu on click
                    className="w-full text-center px-4 py-2 bg-blue-600 text-white rounded transition-colors hover:bg-blue-700 text-lg" // Full width, larger text
                  >
                    Register
                  </NavLink>
                </>
              ) : (
                <>
                  <span className="text-gray-700 dark:text-gray-200 text-lg py-2">Hi, {user.username}</span> {/* Larger text */}
                  <button
                    onClick={handleLogout} // Calls handleLogout which also closes menu
                    className="w-full text-center px-4 py-2 bg-red-500 text-white rounded transition-colors hover:bg-red-600 text-lg" // Full width, larger text
                  >
                    Logout
                  </button>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}