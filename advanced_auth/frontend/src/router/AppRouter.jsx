import React from "react";
import { Routes, Route } from "react-router";
import { useAuth } from "../hoc/AuthProvider";
import Layout from "../pages/Layout/Layout";
import Home from "../pages/Home/Home";
import Loader from "../UI/Loader/Loader";
import Posts from "../pages/Posts/Posts";
import About from "../pages/About/About";
import Search from "../pages/Search/Search";
import Communities from "../pages/Communities/Communities";
import Comments from "../pages/Comments/Comments";
import Authorization from "../pages/Authorization/Authorization";
import RequireAuth from "../hoc/RequireAuth";

export default function AppRouter() {
  const { user, isLoaded } = useAuth();

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route path={"/"} element={<Layout />}>
        {/* Публичные маршруты */}
        <Route index element={<Home />} />
        <Route path={"about"} element={<About />} />
        <Route path={"login"} element={<Authorization isLogin />} />
        <Route path={"registration"} element={<Authorization />} />
        {/* Защищенные маршруты */}
        <Route element={<RequireAuth />}>
          <Route path={"posts"} element={<Posts />} />
          <Route path={"posts/:id"} element={<Comments />} />
          <Route path={"search"} element={<Search />} />
          <Route path={"communities"} element={<Communities />} />
        </Route>
      </Route>
    </Routes>
  );
}
