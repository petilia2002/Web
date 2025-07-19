import React, { useState, useEffect } from "react";
import { Link } from "react-router";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10&_page=1")
      .then((response) => response.json())
      .then((json) => setPosts(json));
  }, []);

  return (
    <>
      <h2>Список постов</h2>
      {posts.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          {posts.map((post) => (
            <Link to={`/posts/${post.id}`} className={"link"} key={post.id}>
              <li style={{ marginBottom: "10px" }}>{post.title}</li>
            </Link>
          ))}
        </div>
      )}
      <Link to="new" className={"link"}>
        Создать пост
      </Link>
    </>
  );
}
