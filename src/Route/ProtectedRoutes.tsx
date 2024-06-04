import React from "react";
import { useAuth } from "../Context/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { LOGIN } from "./router-const";

type Props = { children: React.ReactNode };

const ProtectedRoutes = ({ children }: Props) => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  return isLoggedIn() ? (
    <>{children}</>
  ) : (
    <Navigate to={`/${LOGIN}`} state={{ from: location }} replace></Navigate>
  );
};

export default ProtectedRoutes;