import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Đường dẫn đúng đến AuthContext

const PrivateRoute = ({ element: Component, allowedRoles }) => {
  const { token, role } = useAuth();
  const location = useLocation();

  console.log("User Role:", role);
  console.log("Allowed Roles:", allowedRoles);
  console.log("Is Authenticated:", !!token);

  if (!token) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    console.log("Access Denied");
    return <Navigate to="/error_404" replace />;
  }

  console.log("Access Granted");
  return <Component />;
};

export default PrivateRoute;
