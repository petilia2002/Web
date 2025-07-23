import React from "react";
import { Routes, Route, Navigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import PostsPage from "./pages/PostsPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import CommunitiesPage from "./pages/CommunitiesPage.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path={"posts"} element={<PostsPage />} />
          <Route path={"about"} element={<AboutPage />} />
          <Route path={"search"} element={<SearchPage />} />
          <Route path={"communities"} element={<CommunitiesPage />} />
          <Route path={"*"} element={<Navigate to={"/posts"} replace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
