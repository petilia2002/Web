import React, { forwardRef } from "react";
import MyButton from "./UI/button/MyButton";

export default function PostItem({ post, deletePost }) {
  return (
    <div className="post">
      <div className="post__content">
        <strong>
          {post.id}. {post.title}
        </strong>
        <p>{post.body}</p>
      </div>
      <div className="post__btns">
        <MyButton onClick={() => deletePost(post)}>Удалить</MyButton>
      </div>
    </div>
  );
}
