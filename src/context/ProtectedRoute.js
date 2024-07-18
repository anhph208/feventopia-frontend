import React from 'react';
import { Navigate, useLocation, Route } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element: Component, allowedRoles, restrictedRoles, ...rest }) => {
  const { token, role } = useAuth();
  const location = useLocation();

  console.log("User Role:", role);
  console.log("Allowed Roles:", allowedRoles);
  console.log("Restricted Roles:", restrictedRoles);
  console.log("Is Authenticated:", !!token);

  if (allowedRoles && !allowedRoles.includes(role)) {
    console.log("Access Denied");
    return <Navigate to="/error_404" replace />;
  }

  if (restrictedRoles && restrictedRoles.includes(role)) {
    console.log("Access Denied: Restricted Role");
    return <Navigate to="/error_404" replace />;
  }

  console.log("Access Granted");
  return <Route {...rest} element={<Component />} />;
};

export default ProtectedRoute;
