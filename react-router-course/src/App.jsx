import React from "react";
import { Routes, Route, Navigate } from "react-router";
import "./App.css";
import Layout from "./components/layout/Layout";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import NotFoundPage from "./pages/NotFoundPage";
import PostPage from "./pages/PostPage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import LoginPage from "./pages/LoginPage";
import AuthProvider from "./hoc/AuthProvider";
import RequireAuth from "./hoc/RequireAuth";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />}>
            <Route path="contacts" element={<p>Наши контакты</p>} />
            <Route path="team" element={<p>Наша команда</p>} />
          </Route>
          <Route path="about-us" element={<Navigate to={"/about"} replace />} />
          <Route path="posts" element={<BlogPage />} />
          <Route path="posts/:id" element={<PostPage />} />
          <Route path="posts/:id/edit" element={<EditPage />} />
          <Route
            path="posts/new"
            element={
              <RequireAuth>
                <CreatePage />
              </RequireAuth>
            }
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
