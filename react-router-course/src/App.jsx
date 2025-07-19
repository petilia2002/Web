import React from "react";
import { Routes, Route } from "react-router";
import "./App.css";
import Layout from "./components/layout/Layout";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import NotFoundPage from "./pages/NotFoundPage";
import PostPage from "./pages/PostPage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="about" element={<AboutPage />}></Route>
          <Route path="posts" element={<BlogPage />}></Route>
          <Route path="posts/:id" element={<PostPage />}></Route>
          <Route path="posts/:id/edit" element={<EditPage />}></Route>
          <Route path="posts/new" element={<CreatePage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Route>
      </Routes>
    </>
  );
}
