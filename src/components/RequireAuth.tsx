import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { ReactNode } from 'react';

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { getUser } = useAuth();
  const user = getUser();

  return user ? children : <Navigate to="/login" replace />;
};

export default RequireAuth;
