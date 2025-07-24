import React, { useState } from "react";
import classes from "./PostForm.module.css";
import MyInput from "../../../UI/MyInput/MyInput";
import MyButton from "../../../UI/MyButton/MyButton";

export default function PostForm({ createPost }) {
  const [post, setPost] = useState({ title: "", body: "" });

  function handlerClick(e) {
    e.preventDefault();
    createPost({ ...post, id: Date.now() });
    setPost({ title: "", body: "" });
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
