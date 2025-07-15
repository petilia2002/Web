import React from "react";
import classes from "../styles/PostFilter.module.css";
import MySelect from "./UI/select/MySelect";
import MyInput from "./UI/input/MyInput";

export default function PostFilter({ filter, setFilter }) {
  return (
    <div className={classes.post_search}>
      <MySelect
        defaultValue={"Сортировать по:"}
        options={[
          { value: "title", name: "Названию" },
          { value: "body", name: "Описанию" },
        ]}
        value={filter.sort}
        onChange={(selectedSort) => {
          setFilter({ ...filter, sort: selectedSort });
        }}
      />
      <MyInput
        type="text"
        placeholder="Найти..."
        value={filter.query}
        onChange={(e) => {
          setFilter({ ...filter, query: e.target.value });
        }}
      />
    </div>
  );
}
