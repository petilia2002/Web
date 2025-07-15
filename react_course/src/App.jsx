import React, { useState, createRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import { usePosts } from "./hooks/usePosts.js";

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "CCC",
      body: "aaa",
    },
    {
      id: 2,
      title: "BBB",
      body: "bbb",
    },
    {
      id: 3,
      title: "AAA",
      body: "ccc",
    },
  ]);

  const [filter, setFilter] = useState({ sort: "", query: "" });

  const sortedAndSearchedPosts = usePosts(filter.sort, filter.query, posts);

  function createPost(post) {
    setPosts([...posts, post]);
  }

  function deletePost(post) {
    setPosts(posts.filter((p) => p.id !== post.id));
  }

  return (
    <div className="App">
      <nav className="navbar"></nav>
      <main className="main-content">
        <PostForm createPost={createPost} />
        <PostFilter filter={filter} setFilter={setFilter} />
        <PostList
          posts={sortedAndSearchedPosts}
          title={"Список постов"}
          deletePost={deletePost}
        />
      </main>
      <footer className="footer"></footer>
    </div>
  );
}

export default App;
