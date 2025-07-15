import React from "react";
import PostItem from "./PostItem";

export default function PostList({ posts, title, deletePost }) {
  if (!posts.length) {
    return <h2>Посты не найдены...</h2>;
  }

  return (
    <div className="post_list">
      <h2>{title}</h2>
      <div className="post_list__body">
        {posts.map((post, index) => (
          <PostItem
            number={index + 1}
            post={post}
            key={post.id}
            deletePost={deletePost}
          />
        ))}
      </div>
    </div>
  );
}
