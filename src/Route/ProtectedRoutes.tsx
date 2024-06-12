import React from "react";
import { useAuth } from "../Context/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { LOGIN } from "./router-const";

type Props = { 
  children: React.ReactNode;
  allowedRoles?: string[];
};

const ProtectedRoutes = ({ children, allowedRoles = [] }: Props) => {
  const location = useLocation();
  const { isLoggedIn, user } = useAuth();
  if (!isLoggedIn()) {
    return <Navigate to={`/${LOGIN}`} state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role || "N/A")) {
    return <Navigate to="/not-authorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
