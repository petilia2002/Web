import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((json) => setPost(json));
  }, [id]);

  const goBack = () => navigate(-1);
  const goHome = () => navigate("/", { replace: false, state: "228" });

  return (
    <>
      {post && (
        <>
          <h2>
            {post.id} {post.title}
          </h2>
          <p style={{ marginBottom: "20px" }}>{post.body}</p>
          <Link className={"link"} to={`/posts/${id}/edit`}>
            Редактировать
          </Link>
          <div>
            <button onClick={goBack}>Назад</button>
            <button onClick={goHome}>Домой</button>
          </div>
        </>
      )}
    </>
  );
}
