import React from "react";
import { useLocation, Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth.js";

export default function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to={"/login"} replace state={{ from: location }} />;
  }

  return children;
}
