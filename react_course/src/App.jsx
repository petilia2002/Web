import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import { usePosts } from "./hooks/usePosts.js";
import MyModal from "./components/UI/modal/MyModal.jsx";
import PostService from "./API/PostService.js";
import Loader from "./components/UI/loader/Loader.jsx";
import Navbar from "./components/UI/navbar/Navbar.jsx";
import Footer from "./components/UI/footer/Footer.jsx";
import { useFetching } from "./hooks/useFetching.js";

function App() {
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);

  const sortedAndSearchedPosts = usePosts(filter.sort, filter.query, posts);

  const [fetching, isPostsLoaded, isError] = useFetching(async () => {
    const posts = await PostService.getAll();
    setPosts(posts);
  });

  useEffect(() => {
    fetching();
  }, []);

  function createPost(post) {
    setPosts([...posts, post]);
    setModal(false);
  }

  function deletePost(post) {
    setPosts(posts.filter((p) => p.id !== post.id));
  }

  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <MyModal visible={modal} setVisible={setModal}>
          <PostForm createPost={createPost} />
        </MyModal>
        <PostFilter
          filter={filter}
          setFilter={setFilter}
          visible={modal}
          setVisible={setModal}
        />
        {!isPostsLoaded ? (
          <div className="wrapper_loader">
            <Loader />
          </div>
        ) : (
          <PostList
            posts={sortedAndSearchedPosts}
            title={"Список постов"}
            deletePost={deletePost}
            isError={isError}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
