// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';
// import toast from 'react-hot-toast';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const stored = localStorage.getItem(`user:${username}`);
//     if (!stored) {
//       toast.error('User not found');
//       return;
//     }
//     const parsed = JSON.parse(stored);
//     if (parsed.password !== password) {
//       toast.error('Invalid password');
//       return;
//     }

//     login(username);
//     navigate('/');
//     toast.success('Login successful!');
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white dark:bg-gray-800 p-6 rounded shadow w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
//         <input
//           type="text"
//           placeholder="Username"
//           className="w-full p-2 mb-4 border rounded"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 mb-4 border rounded"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
//           Login
//         </button>
//         <p className="text-sm text-center mt-4">
//           Don't have an account? <a href="/register" className="text-blue-500">Register</a>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const stored = localStorage.getItem(`user:${username}`);
    if (!stored) {
      toast.error('User not found');
      return;
    }
    const parsed = JSON.parse(stored);
    if (parsed.password !== password) {
      toast.error('Invalid password');
      return;
    }
    navigate('/');
    login(username);
    toast.success('Login successful!');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#1e1e1e] text-black dark:text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 rounded-2xl shadow-md bg-white dark:bg-[#2c2c2c] border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold transition"
        >
          Login
        </button>

        <p className="text-sm text-center mt-6 text-gray-600 dark:text-gray-400">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
