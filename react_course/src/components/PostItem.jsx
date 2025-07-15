import React from "react";
import MyButton from "./UI/button/MyButton";

export default function PostItem({ number, post, deletePost }) {
  return (
    <div className="post">
      <div className="post__content">
        <strong>
          {number}. {post.title}
        </strong>
        <p>{post.content}</p>
      </div>
      <div className="post__btns">
        <MyButton onClick={() => deletePost(post.id)}>Удалить</MyButton>
      </div>
    </div>
  );
}
