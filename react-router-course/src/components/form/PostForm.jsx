import React, { useState } from "react";
import classes from "./PostForm.module.css";

export default function PostForm({ query, latest, setSearchParams }) {
  const [search, setSearch] = useState(query);
  const [checked, setChecked] = useState(latest);

  function handleSubmit(e) {
    e.preventDefault();
    setSearchParams({
      query: e.target.query.value,
      latest: e.target.latest.checked,
    });
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit} className={"form"}>
      <input
        type="search"
        name="query"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <input
        type="checkbox"
        name="latest"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <input type="submit" value={"Search"} />
    </form>
  );
}
