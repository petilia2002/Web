import React from "react";
import { Routes, Route, Navigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import Posts from "./pages/Posts/Posts";
import About from "./pages/About/About";
import Search from "./pages/Search/Search";
import Communities from "./pages/Communities/Communities";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={"posts"} element={<Posts />} />
          <Route path={"about"} element={<About />} />
          <Route path={"search"} element={<Search />} />
          <Route path={"communities"} element={<Communities />} />
          <Route path={"*"} element={<Navigate to={"/posts"} replace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
