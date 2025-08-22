import React from "react";
import { Outlet, Navigate, useLocation } from "react-router";
import { useAuth } from "../store/useAuth";
import Loading from "../pages/Loading/Loading";

export default function RequireAuth() {
  const { isAuth, login, registration } = useAuth();
  const location = useLocation();

  if (!login.isLoaded || !registration.isLoaded) {
    return <Loading />;
  }

  if (!isAuth) {
    return (
      <Navigate to={"/login"} replace state={{ from: location.pathname }} />
    );
  }

  return <Outlet />;
}
