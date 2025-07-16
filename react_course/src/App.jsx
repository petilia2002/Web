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

function App() {
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);

  const sortedAndSearchedPosts = usePosts(filter.sort, filter.query, posts);

  const [isPostsLoaded, setIsPostsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  console.log(isPostsLoaded);
  console.log(posts.length);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await PostService.getAll();
        setPosts(posts);
      } catch (e) {
        setIsError(true);
      } finally {
        setIsPostsLoaded(true);
      }
    };
    fetchData();
  }, []);

  function createPost(post) {
    setPosts([...posts, post]);
    setModal(false);
    if (isError) {
      setIsError(false);
    }
  }

  function deletePost(post) {
    setPosts(posts.filter((p) => p.id !== post.id));
  }

  return (
    <div className="App">
      <nav className="navbar"></nav>
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
      <footer className="footer"></footer>
    </div>
  );
}

export default App;
