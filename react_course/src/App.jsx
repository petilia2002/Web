import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import { usePosts } from "./hooks/usePosts.js";
import MyModal from "./components/UI/modal/MyModal.jsx";

function App() {
  const [posts, setPosts] = useState([]);
  console.log(`USE STATE: ${posts.length}`);

  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);

  const sortedAndSearchedPosts = usePosts(filter.sort, filter.query, posts);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        {
          params: {
            _limit: 20,
            _page: 1,
          },
        }
      );
      setPosts(response.data);
    };
    console.log("CALLBACK");
    fetchData();
  }, []);
  console.log("USE EFFECT");

  function createPost(post) {
    setPosts([...posts, post]);
  }

  function deletePost(post) {
    setPosts(posts.filter((p) => p.id !== post.id));
  }

  console.log("RENDER");

  return (
    <div className="App">
      <nav className="navbar"></nav>
      <main className="main-content">
        <MyModal visible={modal} setVisible={setModal}>
          <PostForm createPost={createPost} setVisible={setModal} />
        </MyModal>
        <PostFilter
          filter={filter}
          setFilter={setFilter}
          visible={modal}
          setVisible={setModal}
        />
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
