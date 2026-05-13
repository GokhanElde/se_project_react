import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, isAuthChecked, children }) => {
  if (!isAuthChecked) {
    return null;
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
