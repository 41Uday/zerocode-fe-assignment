import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const testUserKey = 'user:testuser';
    if (!localStorage.getItem(testUserKey)) {
      localStorage.setItem(testUserKey, JSON.stringify({ username: 'testuser', password: 'test123' }));
    }
  }, []);

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      newErrors.username = 'Username must be alphanumeric only (no symbols)';
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(password)
    ) {
      newErrors.password =
        'Password must be at least 8 characters, with uppercase, lowercase, and a number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const existing = localStorage.getItem(`user:${username}`);
    if (existing) {
      setErrors({ username: 'Username already exists' });
      return;
    }

    localStorage.setItem(`user:${username}`, JSON.stringify({ username, password }));
    navigate('/login');
    toast.success('Registration successful! Please login.');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#1e1e1e] text-black dark:text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 rounded-2xl shadow-md bg-white dark:bg-[#2c2c2c] border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Alphanumeric only"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (errors.username) setErrors((prev) => ({ ...prev, username: undefined }));
            }}
            required
          />
          {errors.username && (
            <p className="text-sm text-red-500 mt-1">{errors.username}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            required
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-semibold transition"
        >
          Register
        </button>

        <p className="text-sm text-center mt-6 text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
