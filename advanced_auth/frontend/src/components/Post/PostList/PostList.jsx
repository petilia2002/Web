import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import PostItem from "../PostItem/PostItem.jsx";
import Error from "../../../UI/Error/Error";
import List from "../../List/List";
import classes from "./PostList.module.css";

export default function PostList({ posts, title, deletePost, isError, ref }) {
  return (
    <div className={classes.post_list}>
      <h2 className={classes.post_list__title}>
        {posts.length && !isError ? title : "Посты не найдены.."}
      </h2>
      <List
        items={posts}
        condition={!isError}
        inThisCase={
          <div className={classes.wrapper_msg}>
            <Error text="Не удалось загрузить посты. Пожалуйста, попробуйте позже.." />
          </div>
        }
        className={classes.post_list__content}
        renderItem={(post, index, arr) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 1.0 }}
          >
            <PostItem
              post={post}
              deletePost={deletePost}
              ref={index === arr.length - 1 ? ref : null}
            />
          </motion.div>
        )}
        isAnimate={true}
      />
    </div>
  );
}
