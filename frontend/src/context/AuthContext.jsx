import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
console.log('🔍 Auth API BASE_URL:', BASE_URL);

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await axios.get(`${BASE_URL}/api/auth/me`, {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        console.error('🔴 Auth check failed:', err);
        setUser(null);
      } finally {
        setLoadingAuth(false);
      }
    }
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const res = await axios.post(`${BASE_URL}/api/auth/login`, {
      email,
      password,
    }, { withCredentials: true });
    setUser(res.data.user);
    navigate('/dashboard');
  };

  const register = async (username, email, password) => {
    const res = await axios.post(`${BASE_URL}/api/auth/register`, {
      username,
      email,
      password,
    }, { withCredentials: true });
    setUser(res.data.user);
    navigate('/dashboard');
  };

  const logout = async () => {
    await axios.get(`${BASE_URL}/api/auth/logout`, {
      withCredentials: true,
    });
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loadingAuth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
