import React, { useState } from "react";
import "./App.css";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "JavaScript 1",
      content:
        "JavaScript - это язык программирования для разработкий веб-приложений",
    },
    {
      id: 2,
      title: "JavaScript 2",
      content:
        "JavaScript - это язык программирования для разработкий веб-приложений",
    },
    {
      id: 3,
      title: "JavaScript 3",
      content:
        "JavaScript - это язык программирования для разработкий веб-приложений",
    },
  ]);

  function createPost(post) {
    setPosts([...posts, post]);
  }

  function deletePost(id) {
    setPosts(posts.filter((post) => post.id != id));
  }

  return (
    <div className="App">
      <nav className="navbar"></nav>
      <main className="main-content">
        <PostForm createPost={createPost} />
        {posts.length ? (
          <PostList
            posts={posts}
            title={"Список постов"}
            deletePost={deletePost}
          />
        ) : (
          <h2>Посты не найдены...</h2>
        )}
      </main>
      <footer className="footer"></footer>
    </div>
  );
}

export default App;
