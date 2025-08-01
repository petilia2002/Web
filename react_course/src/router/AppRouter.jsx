import React from "react";
import { Routes, Route, Navigate } from "react-router";
import { useAuth } from "../hoc/AuthProvider";
import { publicRoutes, privateRoutes } from "./routes";
import Layout from "../pages/Layout/Layout";
import Home from "../pages/Home/Home";
import Loader from "../UI/Loader/Loader";

export default function AppRouter() {
  const { user, isLoaded } = useAuth();

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route path={"/"} element={<Layout />}>
        <Route index element={<Home />} />
        {user ? (
          <>
            {privateRoutes.map(({ path, element: Component }) => (
              <Route path={path} element={<Component />} key={path} />
            ))}
            <Route path={"*"} element={<Navigate to={"/posts"} replace />} />
          </>
        ) : (
          <>
            {publicRoutes.map(({ path, element: Component }) =>
              path === "login" ? (
                <Route path={path} element={<Component isLogin />} key={path} />
              ) : (
                <Route path={path} element={<Component />} key={path} />
              )
            )}
            <Route path={"*"} element={<Navigate to={"/login"} replace />} />
          </>
        )}
      </Route>
    </Routes>
  );
}
