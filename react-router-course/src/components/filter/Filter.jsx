import React, { useState } from "react";
import classes from "./Filter.module.css";

export default function Filter({ query, latest, setSearchParams }) {
  return (
    <form className={classes.form}>
      <input
        type="search"
        name="query"
        value={query}
        onChange={(e) =>
          setSearchParams({ query: e.target.value, latest: latest })
        }
      />
      <input
        type="checkbox"
        name="latest"
        checked={latest}
        onChange={(e) =>
          setSearchParams({ query: query, latest: e.target.checked })
        }
      />
    </form>
  );
}
