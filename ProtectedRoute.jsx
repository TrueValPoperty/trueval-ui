import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const isAdmin = localStorage.getItem('adminToken');
  return isAdmin ? children : <Navigate to="/login" />;
}
