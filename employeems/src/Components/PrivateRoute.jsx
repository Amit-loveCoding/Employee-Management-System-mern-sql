import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = JSON.parse(localStorage.getItem("valid")) || false;

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
