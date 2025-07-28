import React, { useState, useEffect, useRef } from "react";
import classes from "./Posts.module.css";
import PostList from "../../components/Post/PostList/PostList";
import PostForm from "../../components/Post/PostForm/PostForm";
import PostFilter from "../../components/Post/PostFilter/PostFilter";
import { useItems } from "../../hooks/useItems.js";
import { useFetching } from "../../hooks/useFetching.js";
import { useObserving } from "../../hooks/useObserving.js";
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
  const [isLimitChange, setIsLimitChange] = useState(false);
  const [page, setPage] = useState(1);

  const targetElement = useRef(null);

  const sortedAndSearchedPosts = useItems(
    filter.sort,
    "title",
    filter.query,
    posts
  );

  const [fetching, isPostsLoaded, isError] = useFetching(async () => {
    const response = isLimitChange
      ? await PostService.getAll(limit * page, 1)
      : await PostService.getAll(limit, page);
    setTotalPages(getTotalPages(response.headers["x-total-count"], limit));
    if (isLimitChange) {
      setPosts(response.data);
      setIsLimitChange(false);
    } else {
      setPosts([...posts, ...response.data]);
    }
  });

  useObserving(targetElement, isPostsLoaded, page < totalPages, () =>
    setPage(page + 1)
  );

  useEffect(() => {
    fetching();
    // window.scrollTo(0, 0);
  }, [page, limit]);

  function createPost(post) {
    setPosts([...posts, post]);
    setModal(false);
  }

  function deletePost(post) {
    setPosts(posts.filter((p) => p.id !== post.id));
  }

  function changeLimit(selectedSort) {
    const newLimit = Number(selectedSort);
    const newPage = newLimit > 0 ? Math.ceil(posts.length / newLimit) : 1;
    setLimit(newLimit);
    setIsLimitChange(true);
    setPage(newPage);
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
        limit={limit}
        changeLimit={changeLimit}
      />
      {!isPostsLoaded && page === 1 ? (
        <div className={classes.wrapper_loader}>
          <Loader />
        </div>
      ) : (
        <PostList
          posts={sortedAndSearchedPosts}
          title={"Список постов"}
          deletePost={deletePost}
          isError={isError}
          ref={targetElement}
        />
      )}
      <Pagination totalPages={totalPages} page={page} setPage={setPage} />
    </>
  );
}
