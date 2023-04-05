import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { user } = useAuthContext();
  if (!user) return <Navigate to="/kResidual/login" />;
  return <>{children}</>;
};

export default ProtectedRoutes;
