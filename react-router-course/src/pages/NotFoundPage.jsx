import React from "react";
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <>
      <h2>Страница не найдена...</h2>
      <div>
        Перейдите на <Link to="/">главную</Link> страницу
      </div>
    </>
  );
}
