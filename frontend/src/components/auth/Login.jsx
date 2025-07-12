// src/components/Auth/Login.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Logged in successfully');
    } catch (err) {
      toast.error(err.message || 'Failed to log in');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-grey">
      <h2 className="text-2xl mb-4 text-blue-400">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email" placeholder="Email"
          value={email} onChange={e => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password" placeholder="Password"
          value={password} onChange={e => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded"
        >
          Log In
        </button>
      </form>
        <p className="mt-4 text-sm text-blue-300">
            Don't have an account? <a href="/register" className="text-blue-600">Register</a>   
        </p>
    </div>
  );
}
