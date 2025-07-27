import React from "react";
import classes from "./PostFilter.module.css";
import MySelect from "../../../UI/MySelect/MySelect";
import MyInput from "../../../UI/MyInput/MyInput";
import MyButton from "../../../UI/MyButton/MyButton";

export default function PostFilter({
  filter,
  setFilter,
  visible,
  setVisible,
  limit,
  setLimit,
  setPage,
}) {
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
      <MySelect
        defaultValue={"Показывать по:"}
        options={[
          { value: 2, name: "2" },
          { value: 5, name: "5" },
          { value: 10, name: "10" },
          { value: 20, name: "20" },
          { value: -1, name: "Все" },
        ]}
        value={limit}
        onChange={(selectedSort) => {
          setLimit(Number(selectedSort));
          setPage(1);
        }}
      />
      <MyInput
        type="text"
        placeholder="Найти..."
        className={classes.text_search}
        value={filter.query}
        onChange={(e) => {
          setFilter({ ...filter, query: e.target.value });
        }}
      />
      <MyButton
        className={classes.createBtn}
        onClick={() => setVisible(!visible)}
      >
        Создать новый пост
      </MyButton>
    </div>
  );
}
