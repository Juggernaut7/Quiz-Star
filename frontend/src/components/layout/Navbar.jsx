// src/components/layout/Navbar.jsx
import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <motion.nav
      className="bg-white dark:bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Link to="/" className="text-xl font-bold text-blue-600">QuizStar</Link>

      <div className="flex items-center space-x-4">
        {navLinks.map((ln) => (
          <NavLink
            key={ln.to}
            to={ln.to}
            className={({ isActive }) =>
              `px-3 py-1 rounded transition-colors ${
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
              className="px-3 py-1 rounded transition-colors text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="px-3 py-1 bg-blue-600 text-white rounded transition-colors hover:bg-blue-700"
            >
              Register
            </NavLink>
          </>
        ) : (
          <>
            <span className="text-gray-700 dark:text-gray-200">Hi, {user.username}</span>
            <button
              onClick={logout}
              className="px-3 py-1 bg-red-500 text-white rounded transition-colors hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </motion.nav>
  );
}
