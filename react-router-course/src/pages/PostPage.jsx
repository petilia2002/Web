import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((json) => setPost(json));
  }, [id]);

  return (
    <>
      {post && (
        <>
          <h2>
            {post.id} {post.title}
          </h2>
          <p style={{ marginBottom: "20px" }}>{post.body}</p>
          <Link className={"link"} to={"edit"}>
            Редактировать
          </Link>
        </>
      )}
    </>
  );
}
