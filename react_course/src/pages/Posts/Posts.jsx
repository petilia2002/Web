import React, { useState, useEffect } from "react";
import classes from "./Posts.module.css";
import PostList from "../../components/Post/PostList/PostList";
import PostForm from "../../components/Post/PostForm/PostForm";
import PostFilter from "../../components/Post/PostFilter/PostFilter";
import { useItems } from "../../hooks/useItems.js";
import { useFetching } from "../../hooks/useFetching.js";
import { getTotalPages } from "../../utils/pagination.js";
import PostService from "../../API/PostService.js";
import Pagination from "../../UI/Pagination/Pagination";
import MyModal from "../../UI/MyModal/MyModal";
import Loader from "../../UI/Loader/Loader";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);

  const [totalPages, setTotalPages] = useState(10);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const sortedAndSearchedPosts = useItems(
    filter.sort,
    "title",
    filter.query,
    posts
  );

  const [fetching, isPostsLoaded, isError] = useFetching(async () => {
    const response = await PostService.getPosts(limit, page);
    setTotalPages(getTotalPages(response.headers["x-total-count"], limit));
    setPosts(response.data);
  });

  useEffect(() => {
    fetching();
    window.scrollTo(0, 0);
  }, [page]);

  function createPost(post) {
    setPosts([...posts, post]);
    setModal(false);
  }

  function deletePost(post) {
    setPosts(posts.filter((p) => p.id !== post.id));
  }

  return (
    <>
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
        <div className={classes.wrapper_loader}>
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
      <Pagination totalPages={totalPages} page={page} setPage={setPage} />
    </>
  );
}
