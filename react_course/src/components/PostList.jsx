import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import PostItem from "./PostItem";
import MessageError from "./UI/error/MessageError.jsx";
import classes from "../styles/PostList.module.css";

export default function PostList({ posts, title, deletePost, isError }) {
  if (isError) {
    return (
      <div className={classes.wrapper_msg}>
        <MessageError text="Не удалось загрузить посты. Пожалуйста, попробуйте позже.." />
      </div>
    );
  }

  return (
    <div className={classes.post_list}>
      <h2>{posts.length ? title : "Посты не найдены.."}</h2>
      <div className={classes.post_list__body}>
        <AnimatePresence>
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 1.0 }}
            >
              <PostItem post={post} deletePost={deletePost} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
