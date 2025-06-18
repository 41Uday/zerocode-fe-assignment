import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { getUser } = useAuth();
  const user = getUser();

  return user ? children : <Navigate to="/login" replace />;
};

export default RequireAuth;
