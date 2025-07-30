import Posts from "../pages/Posts/Posts";
import About from "../pages/About/About";
import Search from "../pages/Search/Search";
import Communities from "../pages/Communities/Communities";
import Comments from "../pages/Comments/Comments";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";

export const privateRoutes = [
  { path: "posts", element: Posts },
  { path: "posts/:id", element: Comments },
  { path: "about", element: About },
  { path: "communities", element: Communities },
  { path: "search", element: Search },
];

export const publicRoutes = [
  { path: "about", element: About },
  { path: "login", element: Login },
  { path: "registration", element: Registration },
];
