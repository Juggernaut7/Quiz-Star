import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import QuizPage from './pages/QuizPage'
import Dashboard from './pages/Dashboard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ProtectedRoute from './components/ProtectedRoute'
import PageWrapper from './components/pageWrapper'
import Navbar from './components/layout/Navbar'
import ResultPage from './pages/ResultPage'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
    <Routes location={location} key={location.pathname}>
  <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
  <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
  <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
  <Route path="/quiz/:category" element={<ProtectedRoute><PageWrapper><QuizPage /></PageWrapper></ProtectedRoute>} />
  <Route path="/dashboard" element={<ProtectedRoute><PageWrapper><Dashboard /></PageWrapper></ProtectedRoute>} />
  <Route path="/result" element={<ProtectedRoute><PageWrapper><ResultPage /></PageWrapper></ProtectedRoute>} />
</Routes>

    </AnimatePresence>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <AnimatedRoutes />
      <ToastContainer position="top-center" limit={1} />
    </>
  )
}
