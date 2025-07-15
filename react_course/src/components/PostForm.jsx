import React, { useState } from "react";
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

export default function PostForm({ createPost }) {
  const [post, setPost] = useState({ title: "", content: "" });

  function handlerClick(e) {
    e.preventDefault();
    createPost({ ...post, id: Date.now() });
    setPost({ title: "", content: "" });
  }

  return (
    <form className="post-form">
      <MyInput
        type="text"
        name="title"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
      />
      <MyInput
        type="text"
        name="content"
        value={post.content}
        onChange={(e) => setPost({ ...post, content: e.target.value })}
      />
      <MyButton onClick={handlerClick}>Добавить пост</MyButton>
    </form>
  );
}
