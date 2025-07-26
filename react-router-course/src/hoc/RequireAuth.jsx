import React from "react";
import { useLocation, Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth.js";

export default function RequireAuth({ children }) {
  const { user, redirectPath } = useAuth();
  const location = useLocation();

  console.log("RequireAuth");
  console.log(user);

  if (!user) {
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  return children;
}
