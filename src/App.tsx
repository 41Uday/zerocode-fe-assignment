import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.page';
import Register from './pages/Register';
import Chat from './pages/Chat';
import RequireAuth from './components/RequireAuth';
import { Toaster } from 'react-hot-toast';

const App = () => {
  useEffect(() => {
    const testUserKey = 'user:test';
    if (!localStorage.getItem(testUserKey)) {
      localStorage.setItem(testUserKey, JSON.stringify({ username: 'test', password: 'test123' }));
    }
  }, []);

  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Chat />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;