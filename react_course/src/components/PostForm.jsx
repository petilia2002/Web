import React, { useState } from "react";
import classes from "../styles/PostForm.module.css";
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

export default function PostForm({ createPost, setVisible }) {
  const [post, setPost] = useState({ title: "", body: "" });

  function handlerClick(e) {
    e.preventDefault();
    createPost({ ...post, id: Date.now() });
    setPost({ title: "", body: "" });
    setVisible(false);
  }

  return (
    <form className={classes.post_form}>
      <MyInput
        type="text"
        name="title"
        placeholder="Название поста"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
      />
      <MyInput
        type="text"
        name="body"
        placeholder="Описание поста"
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
      />
      <MyButton onClick={handlerClick}>Добавить пост</MyButton>
    </form>
  );
}
