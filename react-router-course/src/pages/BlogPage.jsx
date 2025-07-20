import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import PostForm from "../components/form/PostForm";
import Filter from "../components/filter/Filter";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const latest = searchParams.get("latest") === "true";
  const startsWith = latest ? 9 : 1;

  // console.log(searchParams);

  useEffect(() => {
    console.log("Init");
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10&_page=1")
      .then((response) => response.json())
      .then((json) => setPosts(json));
  }, []);

  console.log("render");

  return (
    <>
      <h2>Список постов</h2>
      <Filter query={query} latest={latest} setSearchParams={setSearchParams} />
      {posts.length > 0 && (
        <div style={{ marginBottom: "25px" }}>
          {posts
            .filter(
              (item) =>
                item.title.toLowerCase().includes(query.toLowerCase()) &&
                item.id >= startsWith
            )
            .map((post) => (
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
