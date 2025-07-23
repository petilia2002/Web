import React, { forwardRef } from "react";
import MyButton from "./UI/button/MyButton";
import classes from "../styles/PostItem.module.css";

export default function PostItem({ post, deletePost }) {
  return (
    <div className={classes.post}>
      <div className={classes.post__content}>
        <strong>
          {post.id}. {post.title}
        </strong>
        <p>{post.body}</p>
      </div>
      <div className={classes.post__btns}>
        <MyButton onClick={() => deletePost(post)}>Удалить</MyButton>
      </div>
    </div>
  );
}
