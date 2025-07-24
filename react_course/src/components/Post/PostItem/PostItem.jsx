import React from "react";
import { useNavigate } from "react-router";
import MyButton from "../../../UI/MyButton/MyButton";
import classes from "./PostItem.module.css";

export default function PostItem({ post, deletePost }) {
  const navigate = useNavigate();

  return (
    <div className={classes.post}>
      <div className={classes.post__content}>
        <strong>
          {post.id}. {post.title}
        </strong>
        <p>{post.body}</p>
      </div>
      <div className={classes.post__btns}>
        <MyButton onClick={() => navigate(`/posts/${post.id}`)}>
          Открыть
        </MyButton>
        <MyButton onClick={() => deletePost(post)}>Удалить</MyButton>
      </div>
    </div>
  );
}
