import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { userId, loading } = useAuth();

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (!userId) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;