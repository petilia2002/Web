import React from "react";
import { Routes, Route, Navigate } from "react-router";
import { useAuth } from "../hoc/AuthProvider";
import { publicRoutes, privateRoutes } from "./routes";
import Layout from "../pages/Layout/Layout";
import Home from "../pages/Home/Home";

export default function AppRouter() {
  const { user, isLoaded } = useAuth();

  return (
    <Routes>
      <Route path={"/"} element={<Layout />}>
        <Route index element={<Home />} />
        {user || !isLoaded ? (
          <>
            {privateRoutes.map(({ path, element: Component }) => (
              <Route path={path} element={<Component />} key={path} />
            ))}
            <Route path={"*"} element={<Navigate to={"/posts"} replace />} />
          </>
        ) : (
          <>
            {publicRoutes.map(({ path, element: Component }) => (
              <Route path={path} element={<Component />} key={path} />
            ))}
            <Route path={"*"} element={<Navigate to={"/login"} replace />} />
          </>
        )}
      </Route>
    </Routes>
  );
}
