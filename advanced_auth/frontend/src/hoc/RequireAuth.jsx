import React from "react";
import { Outlet, Navigate, useLocation } from "react-router";
import { useAuth } from "../store/useAuth";
import Loading from "../pages/Loading/Loading";
import { useSelector } from "react-redux";

export default function RequireAuth() {
  // const { isAuth, isLoaded } = useAuth();
  // const { isAuth, isLoaded } = useSelector((state) => state.auth);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const isLoaded = useSelector((state) => state.auth.isLoaded);

  const location = useLocation();
  console.log(isLoaded);

  if (!isLoaded) {
    return <Loading />;
  }

  if (!isAuth) {
    return (
      <Navigate to={"/login"} replace state={{ from: location.pathname }} />
    );
  }

  return <Outlet />;
}
