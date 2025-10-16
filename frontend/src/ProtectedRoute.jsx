import React from "react";
import { Navigate } from "react-router-dom";

// role can be "seller" or "customer"
const ProtectedRoute = ({ children, role }) => {
  const jwt = localStorage.getItem("jwt");
  const userRole = localStorage.getItem("role"); 

  if (!jwt) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    // Logged in but not the right role
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
