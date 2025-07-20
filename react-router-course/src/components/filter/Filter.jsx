import React, { useState } from "react";
import classes from "./Filter.module.css";

/* form = { name: '', password: '' }

1. Пользователь начал менять name:
setForm({ ...form, name: 'Alice' }) // здесь form = { name: '', password: '' }

2. Почти одновременно меняет password:
setForm({ ...form, password: '123' }) // здесь form все еще = { name: '', password: '' }

💣 Результат: последнее обновление затирает name: 'Alice', и ты получаешь:
form = { name: '', password: '123' }

Как избежать: использовать функциональный стиль!!!
*/

export default function Filter({ query, latest, setSearchParams }) {
  return (
    <form className={classes.form}>
      <input
        type="search"
        name="query"
        value={query}
        onChange={(e) =>
          setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("query", e.target.value);
            return newParams;
          })
        }
      />
      <input
        type="checkbox"
        name="latest"
        checked={latest}
        onChange={(e) =>
          setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("latest", e.target.checked);
            return newParams;
          })
        }
      />
    </form>
  );
}
