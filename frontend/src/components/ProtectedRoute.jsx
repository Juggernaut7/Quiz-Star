import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { user, loadingAuth } = useContext(AuthContext);
  
  if (loadingAuth) return null; // or loading spinner
  if (!user) return <Navigate to="/login" replace />;
  
  return children;
}
