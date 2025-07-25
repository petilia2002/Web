import React from "react";
import Posts from "../pages/Posts/Posts";
import About from "../pages/About/About";
import Search from "../pages/Search/Search";
import Communities from "../pages/Communities/Communities";
import Comments from "../pages/Comments/Comments";

export const routes = [
  { path: "posts", element: Posts },
  { path: "posts/:id", element: Comments },
  { path: "about", element: About },
  { path: "communities", element: Communities },
  { path: "search", element: Search },
];
