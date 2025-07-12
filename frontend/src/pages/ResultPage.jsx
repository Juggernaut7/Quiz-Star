import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ResultCard from '../components/ResultCard';

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || {};

  useEffect(() => {
    if (score === undefined || total === undefined) {
      toast.error('Invalid result. Redirecting to home...', { autoClose: 1500 });
      const timeout = setTimeout(() => {
        navigate('/');
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [score, total, navigate]);

  if (score === undefined || total === undefined) {
    return <p className="text-center mt-10 text-gray-700">Invalid result. Redirecting...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <ResultCard score={score} total={total} />
    </div>
  );
}
