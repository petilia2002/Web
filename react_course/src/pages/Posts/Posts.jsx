import React, { useState, useEffect, useRef } from "react";
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

  const observerRef = useRef(null);
  const targetElement = useRef(null);

  const sortedAndSearchedPosts = useItems(
    filter.sort,
    "title",
    filter.query,
    posts
  );

  const [fetching, isPostsLoaded, isError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setTotalPages(getTotalPages(response.headers["x-total-count"], limit));
    if (page === 1) {
      setPosts(response.data);
    } else {
      setPosts([...posts, ...response.data]);
    }
  });

  useEffect(() => {
    console.log(`isPostsLoaded: ${isPostsLoaded}`);
    console.log(`page: ${page}`);

    const target = targetElement.current;

    if (posts.length === page * limit) {
      const options = {
        rootMargin: "0px",
        threshold: 0,
      };

      const callback = (entries, observer) => {
        // console.log(entries);
        entries.forEach((entry) => {
          if (entry.isIntersecting && page < totalPages) {
            setPage(page + 1);
            console.log("Intersection");
            // console.log(entries);
          }
        });
      };

      observerRef.current = new IntersectionObserver(callback, options);
      observerRef.current.observe(target);
    }

    return () => {
      if (observerRef.current && target) {
        observerRef.current.unobserve(target);
        observerRef.current.disconnect();
        console.log("CLEAR");
      }
    };
  }, [page, limit, posts, totalPages, observerRef, targetElement]);

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
        setLimit={setLimit}
        setPage={setPage}
      />
      {!isPostsLoaded && page === 1 ? (
        <div className={classes.wrapper_loader}>
          <Loader />
        </div>
      ) : (
        <>
          <PostList
            posts={sortedAndSearchedPosts}
            title={"Список постов"}
            deletePost={deletePost}
            isError={isError}
            ref={targetElement}
          />
          {/* <div className={classes.target} ref={targetElement}></div> */}
        </>
      )}
      <Pagination totalPages={totalPages} page={page} setPage={setPage} />
    </>
  );
}
