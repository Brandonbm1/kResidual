import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const AuthRoutes = ({ children }) => {
  const { user } = useAuthContext();

  if (user) return <Navigate to="/kResidual/" />;
  return <>{children}</>;
};

export default AuthRoutes;
